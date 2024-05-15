const receivePushNotification = (event) => {
    const { title, body, data, actions } = event.data.json();

    const options = {
        body,
        data,
        actions,
    };

    event.waitUntil(self.registration.showNotification(title, options));
};

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