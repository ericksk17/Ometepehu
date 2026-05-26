/* map.js - embed a real OpenStreetMap view of Isla Ometepe and render place cards (cards open details) */
import { $, escapeHtml, lowResUrl } from './utils.js';

/**
 * initMap now injects a real OpenStreetMap embed centered on Isla Ometepe (Altagracia area)
 * and builds the place cards below the map. Pins are represented via the place cards;
 * clicking a card opens the place detail via onOpen(payload).
 */
export function initMap({ places = [], pinPositions = {}, onOpen = (p) => {} } = {}){
  const mapSim = $('#mapSim');
  if(!mapSim) return;

  // Coordinates roughly centered on Isla Ometepe (Concepción / Maderas area)
  // We'll use an OpenStreetMap embed so users see a real map.
  // bbox chosen to show the island with a comfortable margin.
  const bbox = [-85.634,11.31,-85.37,11.61]; // left,bottom,right,top (lon/lat)
  const marker = '11.455,-85.503'; // center marker (lat,lon)
  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox[0]}%2C${bbox[1]}%2C${bbox[2]}%2C${bbox[3]}&layer=mapnik&marker=${marker}`;

  mapSim.innerHTML = `
    <div style="border-radius:12px;overflow:hidden;box-shadow:var(--shadow);">
      <iframe
        title="Mapa de Isla Ometepe (OpenStreetMap)"
        src="${iframeSrc}"
        style="width:100%;height:220px;border:0;display:block"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        aria-hidden="false"></iframe>
    </div>
    <div class="map-legend" style="margin-top:8px">
      <div><span class="pin pin-recycling"></span> Puntos reciclaje</div>
      <div><span class="pin pin-protected"></span> Zonas protegidas</div>
      <div><span class="pin pin-polluted"></span> Lugares contaminados</div>
      <div><span class="pin pin-eco"></span> Centros ecológicos</div>
    </div>`;

  // Render the place cards into the main cards container (clearing any previous content)
  const cardsWrap = $('#cards');
  if(!cardsWrap) return;
  cardsWrap.innerHTML = ''; // start fresh



  places.forEach(p => {
    const rawThumb = (p.gallery && p.gallery[0]) ? p.gallery[0] : '';
    // request a reduced-resolution variant (factor 2 = half)
    const thumb = lowResUrl(rawThumb || '', 2);
    const c = document.createElement('div');
    c.className = 'card';
    c.tabIndex = 0;
    // add lazy loading and async decoding to reduce initial data and parsing impact
    c.innerHTML = `<img src="${thumb}" alt="${escapeHtml(p.title)}" loading="lazy" decoding="async"><h4>${escapeHtml(p.title)}</h4><p>${escapeHtml(p.text)}</p>`;
    // prepare payload similar to previous behavior
    function makeOpenPayload(orig){
      if(!orig) return orig;
      const gallery = Array.isArray(orig.gallery) ? orig.gallery.slice() : (orig.img ? [orig.img] : []);
      const payload = Object.assign({}, orig, { gallery });
      if(gallery.length) payload.img = gallery[0];
      return payload;
    }
    c.addEventListener('click', () => onOpen(makeOpenPayload(p)));
    c.addEventListener('keypress', e => { if(e.key === 'Enter') onOpen(makeOpenPayload(p)); });
    cardsWrap.appendChild(c);
  });
}