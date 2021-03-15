//importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
//importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyAV2UJXYsPOOTwsfbmw6g_ozy_rVs8zFfA",
  authDomain: "plushkin-blr.firebaseapp.com",
  databaseURL: "https://plushkin-blr.firebaseio.com",
  projectId: "plushkin-blr",
  storageBucket: "plushkin-blr.appspot.com",
  messagingSenderId: "1013433389089",
  appId: "1:1013433389089:web:2bd2daf0e1143a60df5360"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Handling background message', payload);

  // Copy data object to get parameters in the click handler
  payload.data.data = JSON.parse(JSON.stringify(payload.data));

  return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow(target);
  }));
});
