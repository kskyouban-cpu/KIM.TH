// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

const donationForm = document.getElementById('donationForm');
const qrContainer = document.getElementById('qrContainer');

donationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const donorName = document.getElementById('donorName').value.trim();
  const amount = parseInt(document.getElementById('amount').value);
  const message = document.getElementById('message').value.trim();

  if (!donorName || !amount || amount <= 0) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }

  try {
    // เรียก API สร้าง QR Code
    const response = await fetch(`${API_BASE_URL}/donation/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        donorName,
        amount,
        message
      })
    });

    const data = await response.json();

    if (data.success) {
      // แสดง QR Code
      displayQRCode(data.qrCode, donorName, amount, message);
    } else {
      alert('เกิดข้อผิดพลาด: ' + data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('ไม่สามารถสร้าง QR Code ได้');
  }
});

function displayQRCode(qrCodeData, name, amount, message) {
  donationForm.style.display = 'none';
  qrContainer.style.display = 'block';

  document.getElementById('qrCode').innerHTML = `<img src="${qrCodeData}" alt="QR Code">`;
  document.getElementById('infoName').textContent = name;
  document.getElementById('infoAmount').textContent = amount;
  document.getElementById('infoMessage').textContent = message || '(ไม่มีข้อความ)';
}

function resetForm() {
  donationForm.reset();
  donationForm.style.display = 'block';
  qrContainer.style.display = 'none';
}