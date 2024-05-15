const publicKey = 'BJXtHJEgXMd9P2p-X-HxbF4t7-xJnqy6EuyXeM1YN39911MlqG_UMnHJYaI695VG0FarpabdAIocgHBw-m_OYWs';

const messageContainer = document.getElementById('message');

const registerWorker = async () => {
    try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered');

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey,
        });
        console.log('Push Manager subscribed');

        await fetch('http://localhost:3000/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json',
            },
        });
        console.log('Subscribed to server');
    } catch (error) {
        console.error('Service Worker registration or subscription failed:', error);
    }
};

const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            await registerWorker();
        } else {
            console.error('Permission not granted for Notification');
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
    }
};

const init = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.addEventListener('message', (event) => {
            console.log(event);
            messageContainer.innerText = event.data.msg;
            setTimeout(() => {
                messageContainer.innerText = '';
            }, 5000);
        });

        try {
            await requestNotificationPermission();
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('Push Notifications are not supported');
    }
};

init();
