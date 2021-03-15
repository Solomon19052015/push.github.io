// firebase_subscribe.js
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

// браузер поддерживает уведомления
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
if ('Notification' in window) {
    var messaging = firebase.messaging();

    // пользователь уже разрешил получение уведомлений
    // подписываем на уведомления если ещё не подписали
    if (Notification.permission === 'granted') {
        subscribe();
    }

    // по клику, запрашиваем у пользователя разрешение на уведомления
    // и подписываем его
   document.querySelector('#subscribe').onclick = e=>{
       console.log('click')
        subscribe();
    }
   
}

function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
        .then(function () {
            // получаем ID устройства
            messaging.getToken({vapidKey:'BFv4fANA94BY2V7wkXQQF-veVILrK3OiCdk_K7plUPrlp3YzEs2tncq4CZ_OwePFRH9Mh7WiyIgzqlL6eZUt6Og'})
                .then(function (currentToken) {
                    console.log(currentToken);

                 /*    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        console.warn('Не удалось получить токен.');
                        setTokenSentToServer(false);
                    } */
                })
                .catch(function (err) {
                    console.warn('При получении токена произошла ошибка.', err);
                    setTokenSentToServer(false);
                });
    })
    .catch(function (err) {
        console.warn('Не удалось получить разрешение на показ уведомлений.', err);
    });
}

// отправка ID на сервер
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Отправка токена на сервер...');

        var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
        $.post(url, {
            token: currentToken
        });

        setTokenSentToServer(currentToken);
    } else {
        console.log('Токен уже отправлен на сервер.');
    }
}

// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}