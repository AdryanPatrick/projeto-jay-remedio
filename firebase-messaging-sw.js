importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCe-MBs8Kusu-HCV3MpqiIZjolzHmxKf5s",
  authDomain: "nosso-cuidado.firebaseapp.com",
  projectId: "nosso-cuidado",
  storageBucket: "nosso-cuidado.firebasestorage.app",
  messagingSenderId: "637444451377",
  appId: "1:637444451377:web:059a3640c800a290e0b910"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log("📩 Push recebido:", payload);

  const title =
    payload?.notification?.title ||
    payload?.data?.title ||
    "💊 Meu Tratamento";

  const body =
    payload?.notification?.body ||
    payload?.data?.body ||
    "";

  self.registration.showNotification(title, {
    body: body,
    icon: "/projeto-jay-remedio/icone192.png",
    badge: "/projeto-jay-remedio/icone192.png",
    vibrate: [200, 100, 200]
  });
});