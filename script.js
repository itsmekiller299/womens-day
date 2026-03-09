// Confetti
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiPieces = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createConfetti() {
  const colors = ['#b83b5e', '#e8a0bf', '#d4a853', '#7eb8a4', '#fdf8f3'];
  for (let i = 0; i < 120; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }
}

function drawConfetti() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;
  });
  confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 20);
  if (confettiPieces.length > 0) {
    animationId = requestAnimationFrame(drawConfetti);
  }
}

document.getElementById('celebrateBtn').addEventListener('click', () => {
  resizeCanvas();
  createConfetti();
  if (animationId) cancelAnimationFrame(animationId);
  drawConfetti();
  showMessage('Happy Women\'s Day! 🌸');
});

// Flower buttons
const messages = [
  'You bloom! 🌸',
  'Sending you sunshine! 🌺',
  'You\'re one in a million! 🌷',
  'You\'re amazing! 🌹',
  'Celebrating you! 💐',
  'You shine! 🌼'
];
document.querySelectorAll('.flower-btn').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    btn.classList.add('bloom');
    setTimeout(() => btn.classList.remove('bloom'), 600);
    showMessage(messages[i]);
  });
});

// Toast message
function showMessage(text) {
  const popup = document.getElementById('messagePopup');
  popup.textContent = text;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 2500);
}

// Affirmations
const affirmations = [
  'You are capable of more than you know.',
  'Your voice matters. Use it.',
  'You don\'t have to be perfect to be powerful.',
  'Celebrate how far you\'ve come.',
  'You are enough, exactly as you are.',
  'Your dreams are valid. Chase them.',
  'She believed she could, so she did. So can you.',
  'You are not here to shrink—you are here to shine.',
  'Every day you are writing the story of your life. Make it a good one.',
  'You are braver, stronger, and smarter than you think.',
  'Your presence alone makes a difference.',
  'Rest is not a reward—you deserve it without earning it.'
];
const affirmBox = document.getElementById('affirmBox');
const affirmBtn = document.getElementById('affirmBtn');
const affirmSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.3 });
if (affirmBox) affirmSectionObserver.observe(affirmBox);
affirmBtn.addEventListener('click', () => {
  affirmBox.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];
  affirmBox.classList.add('visible');
});

// Scroll animations
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const quoteObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, observerOptions);
document.querySelectorAll('.quote-card').forEach(card => quoteObserver.observe(card));

const factObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, observerOptions);
document.querySelectorAll('.fact-card').forEach(card => factObserver.observe(card));

const trailblazerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 60);
  });
}, observerOptions);
document.querySelectorAll('.trailblazer-card').forEach(card => trailblazerObserver.observe(card));

const waysObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 70);
  });
}, observerOptions);
document.querySelectorAll('.ways-list li').forEach(el => waysObserver.observe(el));

window.addEventListener('resize', resizeCanvas);
