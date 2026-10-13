// NovaPlay High-Speed Service Worker
// Optimized for School Wi-Fi networks with high packet loss, firewall throttling, and offline resilience.

const CACHE_NAME = 'novaplay-cache-v2';

// Core assets to pre-cache immediately on install for zero-latency startup
const CORE_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data/games.json',
  './favicon.svg',
  './favicon.ico',
  './favicon.png',
  './pwa-192x192.png',
  './pwa-512x512.png'
];

// Lightweight offline-ready games (all pure HTML5/canvas, <250KB total)
const OFFLINE_GAMES = [
  './games/2048.html',
  './games/snake.html',
  './games/tetris.html',
  './games/flappy-bird.html',
  './games/pong.html',
  './games/breakout.html',
  './games/dino-run.html',
  './games/space-invaders.html',
  './games/asteroids.html',
  './games/minesweeper.html',
  './games/speed-typing.html',
  './games/tic-tac-toe.html',
  './games/connect4.html',
  './games/cookie-clicker.html'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache core shell first
      return cache.addAll(CORE_SHELL).catch((err) => {
        console.warn('[ServiceWorker] Core pre-cache notice:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Cache-First with Network Fallback & Background Revalidation
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Bypass chrome-extension and non-http schemes
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // If we have a cached version, return it instantly for max speed on School WiFi!
      if (cachedResponse) {
        // Asynchronously update in background if it's app shell or data
        if (
          url.pathname.endsWith('.html') ||
          url.pathname.endsWith('.js') ||
          url.pathname.endsWith('.css') ||
          url.pathname.endsWith('.json')
        ) {
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const clone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
              }
            })
            .catch(() => {
              // Ignore background fetch failure (normal when offline/school wifi drops)
            });
        }
        return cachedResponse;
      }

      // If not cached, fetch from network with timeout protection
      return fetchWithTimeout(request, 10000)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }

          // Cache the new asset for subsequent visits
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch((error) => {
          // If offline and request is an HTML page or game, fallback to cached index.html or simple offline message
          if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html').then((fallback) => {
              return fallback || new Response(
                '<!DOCTYPE html><html><body style="background:#020617;color:#fff;font-family:sans-serif;text-align:center;padding:50px;"><h2>📶 School WiFi Connection Dropped</h2><p>This game is not yet cached offline. Please re-open the portal home page to play cached games.</p><a href="./" style="color:#10b981;font-weight:bold;">Return to Home</a></body></html>',
                { headers: { 'Content-Type': 'text/html' } }
              );
            });
          }
          throw error;
        });
    })
  );
});

// Timeout wrapper for network fetches to prevent hangs on school captive portals
function fetchWithTimeout(request, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Network timeout on school wifi'));
    }, timeoutMs);

    fetch(request)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// Handle messages from client (e.g. 1-click cache all games)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_ALL_GAMES') {
    caches.open(CACHE_NAME).then(async (cache) => {
      let cachedCount = 0;
      for (const gameUrl of OFFLINE_GAMES) {
        try {
          await cache.add(gameUrl);
          cachedCount++;
          if (event.source) {
            event.source.postMessage({
              type: 'CACHE_PROGRESS',
              cached: cachedCount,
              total: OFFLINE_GAMES.length,
              current: gameUrl
            });
          }
        } catch (err) {
          console.warn('[ServiceWorker] Could not cache game:', gameUrl, err);
        }
      }
      if (event.source) {
        event.source.postMessage({
          type: 'CACHE_COMPLETE',
          cached: cachedCount,
          total: OFFLINE_GAMES.length
        });
      }
    });
  }

  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    caches.open(CACHE_NAME).then(async (cache) => {
      let count = 0;
      for (const gameUrl of OFFLINE_GAMES) {
        const match = await cache.match(gameUrl);
        if (match) count++;
      }
      if (event.source) {
        event.source.postMessage({
          type: 'CACHE_STATUS_RESULT',
          cached: count,
          total: OFFLINE_GAMES.length
        });
      }
    });
  }
});
