let remedios =
JSON.parse(localStorage.getItem("remedios")) || [];


Notification.requestPermission();


function salvar(){

let nome =
document.getElementById("nome").value;

let hora =
document.getElementById("hora").value;


remedios.push({
nome,
hora
});


localStorage.setItem(
"remedios",
JSON.stringify(remedios)
);


mostrar();

}


function mostrar(){

let lista =
document.getElementById("lista");


lista.innerHTML="";


remedios.forEach(r=>{

lista.innerHTML += `

<div class="remedio">

💊 ${r.nome}
<br>
⏰ ${r.hora}

</div>

`;

});

}


function verificar(){

let agora =
new Date();


let hora =
agora.toTimeString().slice(0,5);


remedios.forEach(r=>{

if(r.hora==hora){

new Notification(
"💊 Hora do remédio ❤️",
{
body:
"Amor, está na hora de tomar "+r.nome,
vibrate:[500,300,500]
}
);

}

});

}


setInterval(verificar,60000);


mostrar();


// instala como app

if("serviceWorker" in navigator){

navigator.serviceWorker.register(
"service-worker.js"
);

}