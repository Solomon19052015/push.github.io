// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

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