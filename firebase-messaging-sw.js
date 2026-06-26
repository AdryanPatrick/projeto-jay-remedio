importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIza...",
  authDomain: "nosso-cuidado.firebaseapp.com",
  projectId: "nosso-cuidado",
  storageBucket: "nosso-cuidado.firebasestorage.app",
  messagingSenderId: "637444451377",
  appId: "1:637444451377:web:059a3640c800a290e0b910"
});

const messaging = firebase.messaging();

/* 🔥 ÚNICO MÉTODO 100% CONFIÁVEL */
self.addEventListener("push", (event) => {

  console.log("📩 PUSH EVENT RECEBIDO:", event);

  let data = {};

  try {
    data = event.data.json();
  } catch (e) {
    console.log("Erro parse push:", e);
  }

  const title =
    data?.notification?.title ||
    data?.data?.title ||
    "💊 Meu Tratamento";

  const body =
    data?.notification?.body ||
    data?.data?.body ||
    "";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/projeto-jay-remedio/icone192.png",
      badge: "/projeto-jay-remedio/icone192.png",
      vibrate: [200, 100, 200],
      requireInteraction: true
    })
  );
});