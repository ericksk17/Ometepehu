/* utils.js - small helpers */
export const $ = sel => document.querySelector(sel);
export const $$ = sel => Array.from(document.querySelectorAll(sel));

export function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

/**
 * lowResUrl(src, factor)
 * - Tries to return a lower-resolution URL for known providers (e.g. Wikimedia).
 * - For Wikimedia upload URLs it converts to the /thumb/ variant with a target width.
 * - For other URLs it appends a query param ?w=<px> as a best-effort hint.
 * - factor is the downscale factor (1 is original, 2 halves the width).
 */
export function lowResUrl(src, factor = 1){
  try{
    if(!src) return src;
    // We'll aim to reduce delivered width to ~40% of a conservative base (≈60% smaller).
    // factor acts as an additional downscale divisor (existing callers may pass 2 etc).
    const BASE_WIDTH = 400; // conservative reference width used previously
    const MIN_WIDTH = 120;  // don't go below this to keep thumbnails usable
    const desired = Math.max(MIN_WIDTH, Math.round((BASE_WIDTH * 0.4) / Math.max(1, factor)));

    // absolute Wikimedia uploads: convert to /thumb/.../<width>px-<filename>
    if(typeof src === 'string' && src.includes('upload.wikimedia.org')){
      const m = src.match(/(https?:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([^\/]+)\/([^\/]+)$/);
      if(m){
        const base = m[1];
        const partA = m[2];
        const filename = m[3];
        return `${base}/thumb/${partA}/${filename}/${desired}px-${filename}`;
      }
      const parts = src.split('/');
      const filename = parts[parts.length-1];
      return src.replace('/wikipedia/commons/', '/wikipedia/commons/thumb/') + `/${desired}px-${filename}`;
    }

    // For local or other http(s) resources, append a width hint query param (best-effort)
    if(typeof src === 'string' && (src.startsWith('/') || src.startsWith('./') || src.startsWith('http'))){
      if(src.startsWith('data:')) return src;
      return src + (src.includes('?') ? `&w=${desired}` : `?w=${desired}`);
    }
    return src;
  }catch(e){
    return src;
  }
}

export function sampleTextFor(id){
  switch(id){
    case 'maderas': return 'Volcán Maderas: volcán con bosques nubosos y senderos que ofrecen panoramas y oportunidades para caminatas guiadas.';
    case 'primavera': return 'Playa Primavera: una orilla tranquila ideal para descanso y observación de aves; mantiene la playa libre de basura.';
    case 'lago': return 'Lago Cocibolca: el lago más grande de Centroamérica que rodea Ometepe y sustenta su ecología y pesca.';
    case 'playa_santa_cruz': return 'Playa Santa Cruz: espacios de anidación y descanso; respeta la arena y la vegetación costera.';
    default: return 'Descripción detallada sobre el lugar y recomendaciones para visitas sostenibles.';
  }
}