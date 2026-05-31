const QRCode = require('qrcode');

/**
 * สร้าง QR Code PromptPay
 * @param {number} amount - จำนวนเงิน (บาท)
 * @param {string} merchantId - Merchant ID
 * @returns {Promise<string>} - Data URL ของ QR Code
 */
const generatePromptPayQR = async (amount, merchantId) => {
  try {
    // ข้อมูล PromptPay QR Code (EMVCo Standard)
    // ควรตรวจสอบรูปแบบกับ Payment Gateway ที่ใช้
    const promptPayData = `00020101021229370016A0000006700000000000000000000000000210${merchantId}5406${amount.toFixed(2)}5802TH63041795`;

    // สร้าง QR Code
    const qrDataUrl = await QRCode.toDataURL(promptPayData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      width: 300
    });

    return qrDataUrl;
  } catch (error) {
    console.error('❌ QR Code generation failed:', error);
    throw new Error('Failed to generate QR Code');
  }
};

module.exports = {
  generatePromptPayQR
};