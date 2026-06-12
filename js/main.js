// =====================================================================
// EDITE AQUI: Adicione suas fotos e legendas
// =====================================================================
const photos = [
  { src: 'images/branco.jpg', caption: '💕 Muito amor e muita paz' },
  { src: 'images/casinha.jpg', caption: '🏠 Momentos no nosso habitat 🛏' },
  { src: 'images/conquista.JPG', caption: '👩‍🎓 Celebrando as conquistas! 🎉' },
  { src: 'images/outras-terras.jpg', caption: '💑 Aventuras em outras terras' },
  { src: 'images/casamento.JPG', caption: '✨ A união 👩‍❤️‍💋‍👨' },
  { src: 'images/gravida.jpg', caption: '🤰🏾 Aguardando um alien 👽' },
  { src: 'images/praia.jpg', caption: '🔥 Calmaria antes da tempestade kkkkk' },
  { src: 'images/bembas.JPG', caption: '👶 Depois de nove meses... Nosso tesouro!' },
];
// =====================================================================

// Larguras base dos cards (altura = largura * 1.2 aproximadamente)
const BASE_WIDTHS = [158, 178, 198, 212, 168, 188, 202, 162];

function isMobile() { return window.innerWidth < 600; }

function getCardSize(index) {
  if (isMobile()) return { w: 148, h: 178 };
  const base = BASE_WIDTHS[index % BASE_WIDTHS.length];
  const scale = window.innerWidth < 1024 ? 0.86 : 1;
  const w = Math.round(base * scale);
  return { w, h: Math.round(w * 1.22) };
}

function computePositions(count, vw, vh) {
  const TOP_SAFE = 115;
  const MARGIN   = 28;
  const usableW  = vw - MARGIN * 2;
  const usableH  = vh - TOP_SAFE - MARGIN;
  const ar       = usableW / Math.max(usableH, 1);

  let cols = Math.max(1, Math.round(Math.sqrt(count * ar)));
  cols = Math.min(cols, count);
  const rows  = Math.ceil(count / cols);
  const cellW = usableW / cols;
  const cellH = usableH / rows;

  return Array.from({ length: count }, (_, i) => {
    const col    = i % cols;
    const row    = Math.floor(i / cols);
    const { w, h } = getCardSize(i);
    const maxOX  = Math.max(0, cellW - w - 8);
    const maxOY  = Math.max(0, cellH - h - 8);
    return {
      x: MARGIN + col * cellW + maxOX * (0.12 + Math.random() * 0.72),
      y: TOP_SAFE + row * cellH + maxOY * (0.08 + Math.random() * 0.72),
    };
  });
}

// Embaralha array mantendo índice original separado
function shuffleIndices(count) {
  return Array.from({ length: count }, (_, i) => i).sort(() => Math.random() - 0.5);
}

const container = document.getElementById('photo-container');

function createCard(photo) {
  const area = document.createElement('div');
  area.className = 'img-area';

  const ph = document.createElement('div');
  ph.className = 'placeholder';
  ph.textContent = '♥';

  const img = document.createElement('img');
  img.alt = photo.caption;
  img.loading = 'lazy';
  img.addEventListener('load', () => img.classList.add('loaded'));
  img.src = photo.src;

  const cap = document.createElement('span');
  cap.className = 'caption';
  cap.textContent = photo.caption;

  area.appendChild(ph);
  area.appendChild(img);

  const card = document.createElement('div');
  card.className = 'photo-card';
  card.appendChild(area);
  card.appendChild(cap);

  return card;
}

function buildDesktopLayout() {
  document.body.style.overflow = 'hidden';
  container.removeAttribute('style');

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const order = shuffleIndices(photos.length);
  const positions = computePositions(photos.length, vw, vh);

  order.forEach((photoIdx, posIdx) => {
    const photo = photos[photoIdx];
    const { x, y } = positions[posIdx];
    const { w, h } = getCardSize(posIdx);

    const rot   = (Math.random() * 14 - 7).toFixed(2);
    const dur   = (3.2 + Math.random() * 2.8).toFixed(2);
    const delay = -(Math.random() * 5).toFixed(2);
    const zIdx  = Math.ceil(Math.random() * 8);

    const wrapper = document.createElement('div');
    wrapper.className = 'photo-wrapper';
    wrapper.style.cssText = [
      `--rot:${rot}deg`,
      `--dur:${dur}s`,
      `--delay:${delay}s`,
      `left:${x}px`,
      `top:${y}px`,
      `width:${w}px`,
      `height:${h}px`,
      `z-index:${zIdx}`,
    ].join(';');

    wrapper.appendChild(createCard(photo));
    wrapper.addEventListener('click', () => openLightbox(photo));
    container.appendChild(wrapper);
  });
}

function buildMobileLayout() {
  document.body.style.overflow = 'auto';
  container.style.cssText = '';

  photos.forEach(photo => {
    const { w, h } = getCardSize(0);
    const wrapper = document.createElement('div');
    wrapper.className = 'photo-wrapper';
    wrapper.style.width = w + 'px';
    wrapper.style.height = h + 'px';
    wrapper.appendChild(createCard(photo));
    wrapper.addEventListener('click', () => openLightbox(photo));
    container.appendChild(wrapper);
  });
}

function renderAlbum() {
  container.innerHTML = '';
  if (isMobile()) buildMobileLayout();
  else buildDesktopLayout();
}

// ===== LIGHTBOX =====
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lightbox-img');
const lbCaption  = document.getElementById('lightbox-caption');
let savedOverflow = '';

function openLightbox(photo) {
  lbImg.src = photo.src;
  lbCaption.textContent = photo.caption;
  savedOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  lightbox.classList.remove('hidden');
  lightbox.focus();
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lbImg.src = '';
  document.body.style.overflow = savedOverflow;
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);

// Swipe horizontal para fechar lightbox
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  if (Math.abs(e.changedTouches[0].clientX - touchStartX) > 60) closeLightbox();
}, { passive: true });

// ===== QR CODE =====
function openQR() {
  const modal = document.getElementById('qr-modal');
  const qrDiv = document.getElementById('qr-code');
  qrDiv.innerHTML = '';
  document.getElementById('qr-url').textContent = window.location.href;

  if (typeof QRCode !== 'undefined') {
    QRCode.toDataURL(window.location.href, {
      width: 220,
      margin: 2,
      color: { dark: '#2d0a1e', light: '#ffffff' },
    }, function(err, url) {
      if (!err) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'QR Code para este álbum';
        img.width = 220;
        img.height = 220;
        qrDiv.appendChild(img);
      }
    });
  } else {
    qrDiv.textContent = 'QR Code indisponível offline.';
  }

  modal.classList.remove('hidden');
}

function closeQR() {
  document.getElementById('qr-modal').classList.add('hidden');
}

document.getElementById('qr-btn').addEventListener('click', openQR);
document.getElementById('qr-close').addEventListener('click', closeQR);
document.getElementById('qr-overlay').addEventListener('click', closeQR);

// Fechar com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLightbox(); closeQR(); }
});

// ===== HEARTS CANVAS =====
(function initHearts() {
  const canvas = document.getElementById('hearts-canvas');
  const ctx    = canvas.getContext('2d');
  const hearts = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function makeHeart(midScreen) {
    return {
      x:          Math.random() * canvas.width,
      y:          midScreen ? Math.random() * canvas.height : canvas.height + 12,
      size:       9 + Math.random() * 20,
      vy:         0.35 + Math.random() * 0.65,
      alpha:      0.07 + Math.random() * 0.22,
      phase:      Math.random() * Math.PI * 2,
      phaseSpeed: 0.013 + Math.random() * 0.022,
    };
  }

  resize();
  for (let i = 0; i < 20; i++) hearts.push(makeHeart(true));

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (hearts.length < 30 && Math.random() < 0.024) hearts.push(makeHeart(false));

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.y    -= h.vy;
      h.phase += h.phaseSpeed;
      h.x    += Math.sin(h.phase) * 0.38;

      ctx.globalAlpha = h.alpha;
      ctx.fillStyle   = '#e91e8c';
      ctx.font        = `${h.size}px serif`;
      ctx.fillText('♥', h.x, h.y);

      if (h.y < -25) hearts.splice(i, 1);
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  tick();
  window.addEventListener('resize', resize);
})();

// ===== RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderAlbum, 380);
});

// ===== INIT =====
renderAlbum();
