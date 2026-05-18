// STEM-ED-AI Service Worker — cache-first for static assets, network-first for pages
const CACHE_VERSION = 'v1'
const CACHE_NAME = `stem-ed-ai-${CACHE_VERSION}`

const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icons/icon.svg',
]

// Install: precache shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

// Activate: purge old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch: stale-while-revalidate for navigation, cache-first for static
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET requests from our origin
  if (request.method !== 'GET') return
  if (!request.url.startsWith(self.location.origin)) return

  // Skip API routes and Next.js internals
  const url = new URL(request.url)
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/')) return

  // Static assets: cache-first
  const isStatic =
    url.pathname.match(/\.(svg|png|jpg|jpeg|webp|ico|woff2?|ttf)$/) ||
    url.pathname.startsWith('/_next/static/')

  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // HTML navigation: network-first with offline fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return response
        })
        .catch(() => caches.match(request))
    )
  }
})
