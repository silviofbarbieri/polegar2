// ===== THUMBZONE PWA =====
// App otimizado para uso com uma mão

const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
const fabBtn = document.getElementById('fabBtn');

// ===== NAVEGAÇÃO POR ABAS (inferior) =====
function switchView(viewId) {
  views.forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');

  navItems.forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-view="${viewId}"]`)?.classList.add('active');

  // Scrolla pro topo
  document.getElementById('app').scrollTop = 0;
}

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const view = item.dataset.view;
    switchView(view);
  });
});

// ===== FAB — NOVA POSTAGEM =====
// O FAB abre a tela de criar post, perfeito pro polegar
fabBtn.addEventListener('click', () => {
  switchView('add');
  navItems.forEach(n => n.classList.remove('active'));
});

// ===== LIKE INTERAÇÃO =====
document.querySelectorAll('.post-actions button').forEach(btn => {
  btn.addEventListener('click', function() {
    this.style.transform = 'scale(1.2)';
    setTimeout(() => this.style.transform = 'scale(1)', 150);
  });
});

// ===== FOLLOW BUTTONS =====
document.querySelectorAll('.btn-follow').forEach(btn => {
  btn.addEventListener('click', function() {
    const following = this.dataset.following === 'true';
    this.dataset.following = !following;
    this.textContent = following ? 'Seguir' : 'Seguindo';
    this.style.background = following ? 'var(--accent)' : 'var(--success)';
  });
});

// ===== PUBLICAR POST =====
document.querySelector('.btn-publish')?.addEventListener('click', function() {
  const textarea = document.querySelector('.create-post textarea');
  if (textarea.value.trim()) {
    this.textContent = 'Publicando...';
    setTimeout(() => {
      this.textContent = 'Publicar';
      textarea.value = '';
      switchView('feed');
      document.querySelector('[data-view="feed"]').classList.add('active');
    }, 800);
  }
});

// ===== PWA: SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registrado:', reg.scope))
      .catch(err => console.log('SW erro:', err));
  });
}

// ===== PWA: INSTALL BANNER =====
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const dismissInstall = document.getElementById('dismissInstall');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBanner.style.display = 'flex';
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    installBanner.style.display = 'none';
  }
  deferredPrompt = null;
});

dismissInstall.addEventListener('click', () => {
  installBanner.style.display = 'none';
});

// ===== HAPTIC FEEDBACK (vibração leve) =====
function haptic() {
  if (navigator.vibrate) navigator.vibrate(8);
}

[...navItems, fabBtn].forEach(el => {
  el.addEventListener('click', haptic);
});

// ===== PULL-TO-REFRESH VISUAL =====
let startY = 0;
const app = document.getElementById('app');

app.addEventListener('touchstart', (e) => {
  if (app.scrollTop === 0) startY = e.touches[0].clientY;
});

app.addEventListener('touchmove', (e) => {
  if (app.scrollTop === 0 && e.touches[0].clientY - startY > 80) {
    document.querySelector('.top-bar h1').textContent = '📱 ThumbZone ↓ solte para atualizar';
  }
});

app.addEventListener('touchend', () => {
  setTimeout(() => {
    document.querySelector('.top-bar h1').textContent = '📱 ThumbZone';
  }, 1000);
});

console.log('✅ ThumbZone carregado — otimizado para zona do polegar');
