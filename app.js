import { initUI } from './ui.js';
import { initMap } from './map.js';
import { initDetail } from './detail.js';
import { places, tips, pinPositions } from './data.js';

// removed large inline implementation from app.js (split into modules):
// removed functions and constants: mediumZoom, places (in-file copy), tips (in-file copy), $ / $$ helpers,
// removed header control handlers, search, theme, profile menu, app icon injection,
// removed navigation functions, showScreen, hero buttons, report modal logic (reportForm),
// removed carousel, slide wiring, map HTML insertion, pin rendering, card rendering,
// removed detail modal logic, openDetail full implementation, escapeHtml, sampleTextFor,
// removed enableMapNav (pan/zoom), and other inline utilities.
// The code above was refactored into data.js, utils.js, map.js, detail.js and ui.js.

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI interactions (header, nav, tips, cards, report button wiring)
  initUI({ places, tips });

  // Initialize detail modal module once and reuse its API
  const detail = initDetail();

  // Initialize map (renders svg, pins, pan/zoom) and give it the stable open handler
  initMap({ places, pinPositions, onOpen: (p) => detail.open(p) });
});