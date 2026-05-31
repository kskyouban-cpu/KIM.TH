const express = require('express');
const router = express.Router();
const { generatePromptPayQR } = require('../qr-generator');
const { getDB } = require('../db');

/**
 * POST /api/donation/create
 * สร้าง QR Code สำหรับการโดเนท
 */
router.post('/create', async (req, res) => {
  try {
    const { donorName, amount, message } = req.body;

    // Validation
    if (!donorName || !amount || amount <= 0) {
      return res.status(400).json({
        error: 'Missing or invalid required fields'
      });
    }

    // Generate QR Code
    const merchantId = process.env.PROMPTPAY_MERCHANT_ID || '0812345678';
    const qrCode = await generatePromptPayQR(amount, merchantId);

    // สร้าง donation record ใน DB
    const db = getDB();
    const donationsCollection = db.collection('donations');

    const donation = {
      donorName,
      amount,
      message: message || '',
      status: 'pending', // pending, completed, failed
      createdAt: new Date(),
      verifiedAt: null
    };

    const result = await donationsCollection.insertOne(donation);

    res.json({
      success: true,
      donationId: result.insertedId.toString(),
      qrCode: qrCode,
      amount: amount,
      message: 'QR Code generated successfully. Waiting for payment confirmation...'
    });
  } catch (error) {
    console.error('❌ Error creating donation:', error);
    res.status(500).json({
      error: 'Failed to create donation'
    });
  }
});

/**
 * GET /api/donation/:id
 * ดึงข้อมูลการโดเนท
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const donationsCollection = db.collection('donations');

    const donation = await donationsCollection.findOne({
      _id: new (require('mongodb')).ObjectId(id)
    });

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    console.error('❌ Error fetching donation:', error);
    res.status(500).json({
      error: 'Failed to fetch donation'
    });
  }
});

module.exports = router;