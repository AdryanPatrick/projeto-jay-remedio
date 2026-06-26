importScripts(
"https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js"
);


importScripts(
"https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js"
);



firebase.initializeApp({

apiKey: "AIzaSyCe-MBs8Kusu-HCV3MpqiIZjolzHmxKf5s",

authDomain: "nosso-cuidado.firebaseapp.com",

projectId: "nosso-cuidado",

storageBucket: "nosso-cuidado.firebasestorage.app",

messagingSenderId:"637444451377",

appId:"1:637444451377:web:059a3640c800a290e0b910"

});



const messaging =
firebase.messaging();



messaging.onBackgroundMessage(
(payload)=>{


self.registration.showNotification(

payload.notification.title,

{

body:
payload.notification.body,

icon:
"icone192.png"

}

);


});