/* ui.js - header, navigation, tips, report and general UI wiring */
import { $, $$, escapeHtml, lowResUrl } from './utils.js';
import { initDetail } from './detail.js';

export function initUI({ places = [], tips = [] } = {}){
  const btnSearch = $('#btnSearch');
  const searchWrap = $('#searchWrap');
  const searchInput = $('#searchInput');
  const closeSearch = $('#closeSearch');
  const btnTheme = $('#btnTheme');
  const btnProfile = $('#btnProfile');

  // title icon & editable name (kept from original)
  const appTitleEl = document.querySelector('.title');
  if(appTitleEl){
    if(!document.getElementById('appIcon')){
      const appIcon = document.createElement('img');
      appIcon.id = 'appIcon';
      appIcon.src = '/icon_128x128.png';
      appIcon.alt = 'Logo Ometepe Palehuia';
      appIcon.loading = 'lazy';
      appIcon.style.width = '28px';
      appIcon.style.height = '28px';
      appIcon.style.objectFit = 'cover';
      appIcon.style.borderRadius = '6px';
      appIcon.style.marginRight = '8px';
      appIcon.style.verticalAlign = 'middle';
      appIcon.onerror = () => { try { appIcon.remove(); const emoji = document.createElement('span'); emoji.textContent='🌿'; emoji.style.marginRight='8px'; emoji.style.fontSize='20px'; emoji.style.verticalAlign='middle'; appTitleEl.prepend(emoji);}catch(e){} };
      appTitleEl.prepend(appIcon);
    }
    const stored = localStorage.getItem('eco-app-name');
    if(stored){
      const leaf = appTitleEl.querySelector('.leaf');
      appTitleEl.textContent = stored + ' ';
      if(leaf) appTitleEl.appendChild(leaf);
    }
    appTitleEl.style.cursor = 'pointer';
    appTitleEl.setAttribute('title', 'Toca para editar el nombre de la app');
    appTitleEl.addEventListener('click', () => {
      const current = localStorage.getItem('eco-app-name') || appTitleEl.textContent.trim();
      const v = prompt('Editar nombre de la app', current);
      if(v !== null){
        const clean = v.trim() || current;
        const leaf = appTitleEl.querySelector('.leaf');
        appTitleEl.textContent = clean + ' ';
        if(leaf) appTitleEl.appendChild(leaf);
        localStorage.setItem('eco-app-name', clean);
      }
    });
  }

  // search toggle and filtering
  if(btnSearch && searchWrap && searchInput && closeSearch){
    btnSearch.addEventListener('click', () => {
      const hidden = searchWrap.getAttribute('aria-hidden') === 'true';
      searchWrap.setAttribute('aria-hidden', hidden ? 'false' : 'true');
      if(hidden) setTimeout(()=> searchInput.focus(), 120); else searchInput.value = '';
    });
    closeSearch.addEventListener('click', () => {
      searchWrap.setAttribute('aria-hidden','true');
      searchInput.value = '';
    });
    searchInput.addEventListener('input', (e) => {
      const q = (e.target.value || '').toLowerCase().trim();
      const placeCards = $$('#cards .card');
      const tipCards = $$('#tipsCards .card');
      function toggleList(list){
        list.forEach(c => {
          const text = c.textContent.toLowerCase();
          c.style.display = (!q || text.includes(q)) ? '' : 'none';
        });
      }
      toggleList(placeCards);
      toggleList(tipCards);
    });
  }

  // theme toggle
  if(btnTheme){
    const root = document.documentElement;
    const applied = localStorage.getItem('eco-theme') || (root.getAttribute('data-theme') || '');
    if(applied) root.setAttribute('data-theme', applied);
    const updateIcon = () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if(!btnTheme) return;
      // set accessible pressed state and title
      btnTheme.setAttribute('aria-pressed', String(isDark));
      btnTheme.title = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
      // visual content with a small label for clarity
      btnTheme.innerHTML = `<span class="theme-emoji">${isDark ? '🌞' : '🌗'}</span>`;
      // apply classes so CSS can style button for both themes
      btnTheme.classList.toggle('theme-dark', isDark);
      btnTheme.classList.toggle('theme-light', !isDark);
    };
    updateIcon();
    btnTheme.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = isDark ? '' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('eco-theme', next);
      updateIcon();
    });
  }

  // profile menu (shows stored name and allows editing like a lightweight sign-in)
  if(btnProfile){
    const profileMenuId = 'profileMenu';
    let menu = document.getElementById(profileMenuId);

    // helper to read/write a fake "session" name
    const storageKey = 'eco-user-name';
    function getUserName(){
      return (localStorage.getItem(storageKey) || '').trim();
    }
    function setUserName(v){
      if(v && v.trim()){
        localStorage.setItem(storageKey, v.trim());
      } else {
        localStorage.removeItem(storageKey);
      }
      refreshProfileUI();
    }

    // update the profile button visual to show initials or default emoji
    function refreshProfileUI(){
      const name = getUserName();
      if(!btnProfile) return;
      if(name){
        // show initials
        const parts = name.split(' ').filter(Boolean);
        const initials = (parts[0] ? parts[0][0] : '') + (parts[1] ? parts[1][0] : '');
        btnProfile.innerHTML = `<span style="font-weight:700;color:var(--green);font-size:14px">${initials.toUpperCase()}</span>`;
        btnProfile.title = `Sesión como ${name} — Toca para opciones`;
      } else {
        btnProfile.innerHTML = '👤';
        btnProfile.title = 'Invitado — Toca para opciones';
      }
    }

    if(!menu){
      menu = document.createElement('div');
      menu.id = profileMenuId;
      menu.style.position = 'absolute';
      menu.style.top = '58px';
      menu.style.right = '12px';
      menu.style.background = 'var(--card)';
      menu.style.padding = '10px';
      menu.style.borderRadius = '10px';
      menu.style.boxShadow = 'var(--shadow)';
      menu.style.display = 'none';
      menu.style.minWidth = '180px';
      // content placeholders updated dynamically
      menu.innerHTML = `<div id="profileHeader" style="font-weight:700;color:var(--green);margin-bottom:6px">Perfil</div>
                        <div id="profileSub" style="font-size:13px;color:var(--muted);margin-bottom:8px">Invitado</div>
                        <div style="display:flex;gap:8px">
                          <button id="editNameBtn" style="flex:1;padding:8px;border-radius:8px;border:none;background:var(--accent);color:#fff">Editar</button>
                          <button id="signOutBtn" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(0,0,0,0.06);background:transparent;color:var(--muted)">Cerrar</button>
                        </div>`;
      document.body.appendChild(menu);

      // wire buttons
      menu.querySelector('#editNameBtn').addEventListener('click', () => {
        const current = getUserName() || '';
        const v = prompt('Nombre para mostrar (ej: Juan Pérez)', current);
        if(v !== null){
          setUserName(v.trim());
          menu.style.display = 'none';
        }
      });
      menu.querySelector('#signOutBtn').addEventListener('click', () => {
        setUserName('');
        menu.style.display = 'none';
      });
    }

    // keep header/sub updated
    function updateMenuText(){
      const header = menu.querySelector('#profileHeader');
      const sub = menu.querySelector('#profileSub');
      const name = getUserName();
      if(name){
        header.textContent = name;
        sub.textContent = 'Sesión simulada';
        sub.style.color = 'var(--muted)';
        menu.querySelector('#editNameBtn').textContent = 'Cambiar';
        menu.querySelector('#signOutBtn').textContent = 'Cerrar sesión';
      } else {
        header.textContent = 'Perfil';
        sub.textContent = 'Invitado';
        menu.querySelector('#editNameBtn').textContent = 'Iniciar';
        menu.querySelector('#signOutBtn').textContent = 'Cerrar';
      }
    }

    // ensure UI sync
    function refreshAll(){
      refreshProfileUI();
      updateMenuText();
    }

    // initial render
    refreshAll();

    btnProfile.addEventListener('click', (e) => {
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      updateMenuText();
    });

    // click-away to close
    document.addEventListener('click', (ev) => {
      if(!menu) return;
      if(ev.target === btnProfile || btnProfile.contains(ev.target)) return;
      if(menu.contains(ev.target)) return;
      menu.style.display = 'none';
    });

    // update visuals if storage changes in another tab
    window.addEventListener('storage', (e) => { if(e.key === storageKey) refreshAll(); });
  }

  // navigation buttons
  const navBtns = $$('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      showScreen(target);
    });
  });

  function showScreen(id){
    $$('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if(el) el.classList.add('active');

    // keep all navigation buttons visible at all times; only update active state on the clicked button
    // this preserves consistent navigation and prevents buttons from disappearing when returning to home.
  }

  // hero report button wiring
  const reportModal = document.getElementById('reportModal');
  const btnReport = $('#btnReport');
  if(btnReport && reportModal){
    btnReport.addEventListener('click', () => { reportModal.setAttribute('aria-hidden','false'); });
    $('#closeReport').addEventListener('click', () => reportModal.setAttribute('aria-hidden','true'));
    $('#cancelReport').addEventListener('click', () => reportModal.setAttribute('aria-hidden','true'));
  }

  // report submit (keeps original websim integration)
  const submitReport = document.getElementById('submitReport');
  if(submitReport){
    submitReport.addEventListener('click', async () => {
      const reportStatus = document.getElementById('reportStatus');
      const reportPhoto = document.getElementById('reportPhoto');
      const reportForm = document.getElementById('reportForm');
      const category = document.getElementById('reportCategory').value;
      const desc = document.getElementById('reportDesc').value.trim();
      const location = document.getElementById('reportLocation').value.trim();
      if(!desc){
        reportStatus.style.display = 'block';
        reportStatus.textContent = 'Por favor agrega una descripción.';
        return;
      }
      submitReport.disabled = true;
      reportStatus.style.display = 'block';
      reportStatus.textContent = 'Enviando reporte...';
      try{
        let imageUrl;
        if(reportPhoto.files && reportPhoto.files[0]){
          imageUrl = await window.websim.upload(reportPhoto.files[0]);
        }
        const content = `Reporte: ${category}\nUbicación: ${location || 'no especificada'}\nDescripción: ${desc}`;
        const images = imageUrl ? [imageUrl] : undefined;
        const res = await window.websim.postComment({ content, images });
        reportStatus.textContent = res && res.error ? `Error: ${res.error}` : 'Reporte enviado. Gracias por colaborar.';
        if(!res || !res.error){
          setTimeout(()=> {
            reportModal.setAttribute('aria-hidden','true');
            reportStatus.style.display = 'none';
            reportForm.reset();
          }, 900);
        } else {
          submitReport.disabled = false;
        }
      }catch(err){
        console.error(err);
        reportStatus.textContent = 'Error al enviar. Intenta de nuevo.';
        submitReport.disabled = false;
      }
    });
  }

  // render tips page cards (try .jpg first, fall back to provided image or bundled mascot)
  const tipsCards = $('#tipsCards');
  if(tipsCards){
    tips.forEach(t => {
      const c = document.createElement('div');
      c.className = 'card';



      // original image reference (relative or absolute)
      const img = t.img ? (t.img.startsWith('/') ? t.img.slice(1) : t.img) : '';
      // prefer a .jpg variant if available on the server (will fall back onerror)
      const jpgCandidate = img ? img.replace(/\.(png|jpeg|webp)$/i, '.jpg') : '';
      const primarySrcRaw = jpgCandidate || img || 'nico.png';
      const fallbackSrcRaw = img || 'nico.png';

      // request a lower-resolution variant for the card image
      const primarySrc = lowResUrl(primarySrcRaw, 2);
      const fallbackSrc = lowResUrl(fallbackSrcRaw, 2);

      c.tabIndex = 0;
      // try primarySrc (jpg), and on error replace with the fallback (original image or bundled mascot)
      c.innerHTML = `<img src="${primarySrc}" alt="${escapeHtml(t.title)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallbackSrc}'"><h4>${escapeHtml(t.title)}</h4><p>${escapeHtml(t.text)}</p>`;

      // gallery: prefer the original provided img for the detail view (keeps original format if jpg missing)
      const gallery = img ? [img] : [fallbackSrc];
      c.addEventListener('click', () => initDetail().open({ title: t.title, gallery, text: t.text }));
      c.addEventListener('keypress', e => { if(e.key === 'Enter') initDetail().open({ title: t.title, gallery, text: t.text }); });
      tipsCards.appendChild(c);
    });
  }

  // small touch tweak
  $$('.nav-btn, .card, .slide, .action-btn, .tip-card').forEach(el => el.style.touchAction = 'manipulation');
}