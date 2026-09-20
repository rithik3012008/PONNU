// firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);

// Your Firebase project configuration
firebase.initializeApp({
  apiKey: "AIzaSyA11kPDh7J4NUb3BQwB-RSarBvBiEKAdvM",
  authDomain: "ponnu-34058.firebaseapp.com",
  projectId: "ponnu-34058",
  storageBucket: "ponnu-34058.firebasestorage.app",
  messagingSenderId: "250496802032",
  appId: "1:250496802032:web:4d1e08dfd545ac13623635",
  measurementId: "G-HD86PN01YB"
});

const messaging = firebase.messaging();

// Handle notifications when the website is not currently open/visible
messaging.onBackgroundMessage((payload) => {
  const data = payload?.data || {};

  const title =
    data.title ||
    payload?.notification?.title ||
    "PONNU 💙";

  const body =
    data.body ||
    payload?.notification?.body ||
    "New message";

  self.registration.showNotification(title, {
    body: body,

    // Make sure these files actually exist on your deployed website.
    icon: "/icon-192.png",
    badge: "/icon-192.png",

    tag: "ponnu-message",

    data: {
      url: "/"
    }
  });
});

// When the user taps the notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then((clientList) => {
        // If PONNU is already open, focus it
        for (const client of clientList) {
          if ("focus" in client) {
            return client.focus();
          }
        }

        // Otherwise open the website
        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      })
  );
});