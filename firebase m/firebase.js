import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getMessaging, getToken }
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging.js";


const firebaseConfig = {

apiKey: "AIzaSyCe-MBs8Kusu-HCV3MpqiIZjolzHmxKf5s",

authDomain: "nosso-cuidado.firebaseapp.com",

projectId: "nosso-cuidado",

storageBucket: "nosso-cuidado.firebasestorage.app",

messagingSenderId: "637444451377",

appId: "1:637444451377:web:059a3640c800a290e0b910"

};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);


async function ativarNotificacao(){

  if(!("Notification" in window)){
    console.log("Navegador sem suporte");
    return;
  }

  const permissao = await Notification.requestPermission();

  if(permissao === "granted"){

    console.log("Permissão liberada ❤️");

    /* ✅ CORREÇÃO IMPORTANTE: SW na raiz */
    const registroSW = await navigator.serviceWorker.register(
      "/projeto-jay-remedio/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {

      vapidKey:
      "BISBY2DVRPxvlbQSLjVvUPFUY1NRJWLL844d2f9HifgOI8J7o3y7QD3PJrNupxbW4jG23i0LRS0ceq_86aVADUw",

      serviceWorkerRegistration: registroSW

    });

    console.log("TOKEN DO CELULAR:", token);

  } else {
    console.log("Notificação bloqueada");
  }

}


ativarNotificacao();