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

/* 🔥 ÚNICO HANDLER OFICIAL DO FIREBASE */
messaging.onBackgroundMessage((payload) => {

  console.log("📩 TESTE FINAL:", payload);

  self.registration.showNotification("🔥 TESTE PUSH", {
    body: "Se você está vendo isso, está 100% funcionando",
    icon: "/projeto-jay-remedio/icone192.png",
    requireInteraction: true,
    vibrate: [200, 100, 200]
  });

});