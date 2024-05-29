const CACHE_NAME = 'marvel-app';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/src/main.tsx',
    '/index.tsx',
];

// Установка и кэширование ресурсов
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Обработка запросов на ресурсы
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Обновление кэша при активации нового service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Обработка push-уведомлений
const receivePushNotification = (event) => {
    const { title, body, data, actions } = event.data.json();

    const options = {
        body,
        data,
        actions,
    };

    event.waitUntil(self.registration.showNotification(title, options));
};

// Обработка кликов по уведомлениям
const handleClickNotification = (event) => {
    if (event.action === 'close') {
        event.notification.close();
        return;
    }

    if (event.action === 'open' || event.action === '') {
        event.notification.close();

        event.waitUntil(
            clients
                .matchAll({ type: 'window', includeUncontrolled: true })
                .then((windowClients) => {
                    if (windowClients.length > 0) {
                        windowClients[0].focus().then((client) =>
                            client.postMessage({
                                msg: event.notification.data || 'some data',
                            })
                        );
                    } else {
                        return clients.openWindow('/').then((client) =>
                            client.postMessage({
                                msg: event.notification.data || 'some data',
                            })
                        );
                    }
                })
        );
    }
};

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', handleClickNotification);