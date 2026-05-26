/* detail.js - encapsulates detail modal and medium-zoom usage */
import mediumZoom from "medium-zoom";
import { $, lowResUrl } from './utils.js';

let _currentGallery = [];
let _currentIndex = 0;
let _zoom = null;

const modal = $('#detailModal');
let detailImg = $('#detailImg'); // switched to let so we can reassign
const detailTitle = $('#detailTitle');
const detailText = $('#detailText');
const closeModal = $('#closeModal');

function ensureZoom(img){
  try {
    if (_zoom && typeof _zoom.attach === 'function') {
      _zoom.attach(img);
    } else {
      _zoom = mediumZoom(img, { background: 'rgba(5,10,5,0.6)', margin: 40 });
    }
  } catch (err) {
    _zoom = mediumZoom(img, { background: 'rgba(5,10,5,0.6)', margin: 40 });
  }
}

function openDetail(data){
  const gallery = data.gallery && data.gallery.length ? data.gallery : (data.img ? [data.img] : []);
  const mainSrc = gallery[0] || '';

  // ensure we always update the actual DOM <img> element that is currently in the modal
  // set values first, then rebuild thumbnails
  // If the image element gets replaced below, we'll reassign detailImg to the new node and keep its src.
  if(detailImg) {
    detailImg.src = mainSrc;
    detailImg.alt = data.title || '';
  }

  detailTitle.textContent = data.title || '';
  detailText.textContent = data.text || '';

  // thumbnail strip
  let thumbsContainer = modal.querySelector('.detail-thumbs');
  if(!thumbsContainer){
    thumbsContainer = document.createElement('div');
    thumbsContainer.className = 'detail-thumbs';
    modal.querySelector('.detail-body').appendChild(thumbsContainer);
  }
  thumbsContainer.innerHTML = '';


  gallery.forEach((src, idx) => {
    const thumbSrc = lowResUrl(src, 2);
    const t = document.createElement('div');
    t.className = 'detail-thumb' + (idx===0 ? ' selected' : '');
    t.innerHTML = `<img src="${thumbSrc}" alt="thumb-${idx}" loading="lazy" decoding="async">`;
    t.addEventListener('click', () => {
      // update the live image element
      if(detailImg) detailImg.src = src; // use original full image for zoom/detail open
      modal.querySelectorAll('.detail-thumb').forEach(el => el.classList.remove('selected'));
      t.classList.add('selected');
      ensureZoom(detailImg);
    });
    thumbsContainer.appendChild(t);
  });

  modal.setAttribute('aria-hidden', 'false');

  // initialize zoom on the element currently in DOM
  ensureZoom(detailImg);

  _currentGallery = gallery;
  _currentIndex = 0;

  // touch swipe handlers (simple)
  let startY = null, moved = false;
  function onTouchStart(e){ const t = e.touches ? e.touches[0] : e; startY = t.clientY; moved = false; }
  function onTouchMove(e){ if(startY===null) return; const t = e.touches ? e.touches[0] : e; if(Math.abs(t.clientY - startY) > 8) moved = true; }
  function showIndex(idx){
    if(!(_currentGallery && _currentGallery.length)) return;
    _currentIndex = (idx + _currentGallery.length) % _currentGallery.length;
    const src = _currentGallery[_currentIndex];
    if(detailImg) detailImg.src = src;
    modal.querySelectorAll('.detail-thumb').forEach((el,i)=> el.classList.toggle('selected', i===_currentIndex));
    ensureZoom(detailImg);
  }
  function onTouchEnd(e){
    if(!moved || startY===null){ startY=null; moved=false; return; }
    const t = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : e;
    const dy = t.clientY - startY;
    const threshold = 30;
    if(dy < -threshold) showIndex(_currentIndex + 1);
    else if(dy > threshold) showIndex(_currentIndex - 1);
    startY=null; moved=false;
  }

  // replace image node to remove stale listeners, but keep its src/alt and reassign detailImg to the new node
  if(detailImg){
    const preservedSrc = detailImg.src;
    const preservedAlt = detailImg.alt;
    const newNode = detailImg.cloneNode(true);
    newNode.src = preservedSrc;
    newNode.alt = preservedAlt;
    detailImg.replaceWith(newNode);
    detailImg = newNode; // reassign to the live DOM node reference
  }

  // attach touch listeners to the current image element
  if(detailImg){
    detailImg.addEventListener('touchstart', onTouchStart, {passive:true});
    detailImg.addEventListener('touchmove', onTouchMove, {passive:true});
    detailImg.addEventListener('touchend', onTouchEnd);
  }

  // close handlers (ensure idempotent)
  closeModal.removeEventListener && closeModal.removeEventListener('click', () => {}); // safe no-op
  closeModal.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e) => { if(e.target === modal) modal.setAttribute('aria-hidden','true'); });

  // ensure zoom attaches to the correct, current element
  ensureZoom(detailImg);

  return { open: openDetail };
}

export function initDetail(){
  return { open: openDetail };
}

export default initDetail;