const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { server, io } = require('../server');
const crypto = require('crypto');

/**
 * POST /api/webhook/payment
 * รับ Webhook จาก Payment Gateway (Opn, GB Prime Pay, ฯลฯ)
 */
router.post('/payment', async (req, res) => {
  try {
    // ตรวจสอบ Webhook Signature
    const signature = req.headers['x-webhook-signature'] || req.headers['x-payment-signature'];
    const webhookSecret = process.env.PAYMENT_GATEWAY_WEBHOOK_SECRET;

    if (signature && webhookSecret) {
      const hash = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (hash !== signature) {
        console.warn('⚠️ Invalid webhook signature');
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    // ประมวลผลข้อมูล Webhook
    const { donation_id, amount, status, merchant_reference } = req.body;

    if (status !== 'success' && status !== 'completed') {
      return res.json({ success: true, message: 'Payment not completed' });
    }

    // อัปเดตสถานะการโดเนทในฐานข้อมูล
    const db = getDB();
    const donationsCollection = db.collection('donations');

    const updateResult = await donationsCollection.findOneAndUpdate(
      { _id: new (require('mongodb')).ObjectId(donation_id) },
      {
        $set: {
          status: 'completed',
          verifiedAt: new Date(),
          gatewayReference: merchant_reference
        }
      },
      { returnDocument: 'after' }
    );

    if (updateResult.value) {
      const donation = updateResult.value;

      // ส่งข้อมูลไปยัง Overlay ผ่าน WebSocket
      io.emit('new_donation', {
        donorName: donation.donorName,
        amount: donation.amount,
        message: donation.message,
        timestamp: new Date(),
        donationId: donation._id.toString()
      });

      console.log('✅ Donation completed:', donation.donorName, donation.amount);
    }

    res.json({
      success: true,
      message: 'Webhook processed successfully'
    });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({
      error: 'Failed to process webhook'
    });
  }
});

module.exports = router;