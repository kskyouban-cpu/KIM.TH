// WebSocket Configuration
const WS_URL = 'http://localhost:3000';
const io = window.io || { connect: () => {} };

let socket = null;

// Initialize WebSocket connection
function initializeOverlay() {
  if (typeof window !== 'undefined' && window.io) {
    socket = window.io(WS_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });

    socket.on('connect', () => {
      console.log('✅ Overlay connected to server:', socket.id);
    });

    socket.on('new_donation', (data) => {
      console.log('💝 New donation received:', data);
      displayDonationAlert(data);
    });

    socket.on('disconnect', () => {
      console.log('❌ Overlay disconnected from server');
    });
  }
}

/**
 * แสดง Alert เมื่อมีการโดเนทใหม่
 */
function displayDonationAlert(donation) {
  const { donorName, amount, message } = donation;

  // เล่นเสียงแจ้งเตือน
  playAlertSound();

  // สร้าง Alert Box
  const alertBox = document.createElement('div');
  alertBox.className = 'donation-alert';
  alertBox.innerHTML = `
    <div class="alert-content">
      <h3 class="donor-name">${escapeHtml(donorName)}</h3>
      <p class="donation-amount">💰 ${amount} บาท</p>
      ${message ? `<p class="donation-message">${escapeHtml(message)}</p>` : ''}
    </div>
  `;

  const container = document.getElementById('overlayContainer');
  container.appendChild(alertBox);

  // Read message using Web Speech API (ถ้าต้องการ)
  if (message) {
    speakMessage(`${donorName} โดเนท ${amount} บาท กล่าวว่า ${message}`);
  } else {
    speakMessage(`${donorName} โดเนท ${amount} บาท`);
  }

  // ลบ Alert หลังจาก 8 วินาที
  setTimeout(() => {
    alertBox.classList.add('fade-out');
    setTimeout(() => alertBox.remove(), 500);
  }, 8000);
}

/**
 * เล่นเสียงแจ้งเตือน
 */
function playAlertSound() {
  const audio = document.getElementById('alertSound');
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(err => console.log('Audio play failed:', err));
  }
}

/**
 * อ่านข้อความด้วย Text-to-Speech API
 */
function speakMessage(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel(); // ยกเลิกเสียงอ่านก่อนหน้า
    window.speechSynthesis.speak(utterance);
  }
}

/**
 * Escape HTML เพื่อป้องกัน XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOverlay);
} else {
  initializeOverlay();
}