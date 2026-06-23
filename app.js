const frases=[

"Estou cuidando de você mesmo de longe ❤️",

"Cada dose é um passo para você ficar bem 💕",

"Você é muito especial para mim ❤️",

"Não esquece: você é minha prioridade 💊",

"Estou torcendo por você todos os dias 🌷"

];



document.getElementById("frase")
.innerHTML =
frases[
Math.floor(Math.random()*frases.length)
];




// BANCO LOCAL


let remedios =
JSON.parse(localStorage.getItem("tratamento"));



if(!remedios){


remedios=[


{

nome:"Prednisona",

dias:5,

horarios:["08:00","20:00"],

tomados:criarDias(5,["08:00","20:00"],4)

},


{

nome:"Descon",

dias:7,

horarios:["06:00","14:00","22:00"],

tomados:criarDias(7,
["06:00","14:00","22:00"],4)

},



{

nome:"Amoxicilina",

dias:14,

horarios:["09:00","21:00"],

tomados:criarDias(14,
["09:00","21:00"],4)

}


];


salvar();

}



function criarDias(total,horas,ate){


let lista=[];


for(let d=1;d<=ate;d++){


horas.forEach(h=>{

lista.push({

dia:d,

hora:h,

data:"já tomado"

});

});


}


return lista;

}



function salvar(){

localStorage.setItem(
"tratamento",
JSON.stringify(remedios)
);

}




function marcar(r,d,h){


let existe =
remedios[r].tomados.find(
x=>x.dia==d && x.hora==h
);



if(existe)return;



let agora=new Date();


remedios[r].tomados.push({

dia:d,

hora:h,

data:

agora.toLocaleString()

});



salvar();

mostrar();


}




function mostrar(){


let area =
document.getElementById("lista");


area.innerHTML="";



remedios.forEach((r,i)=>{


let total=
r.dias*r.horarios.length;



let feitos =
r.tomados.length;



let porcentagem =
Math.round(
(feitos/total)*100
);



area.innerHTML+=`


<div class="card">


<h2>💊 ${r.nome}</h2>


<div class="progress">

<div class="bar"
style="width:${porcentagem}%">

</div>

</div>


<p>

${feitos}/${total}
doses concluídas

</p>


`;



for(let d=1;d<=r.dias;d++){


area.innerHTML+=`

<div class="dia">

<b>Dia ${d}</b>

</div>

`;



r.horarios.forEach(h=>{


let feito =
r.tomados.find(
x=>x.dia==d && x.hora==h
);



area.innerHTML+=`

<div class="dia">


<span>

⏰ ${h}

</span>


<input type="checkbox"

${feito?"checked":""}

onclick="marcar(${i},${d},'${h}')">


</div>


`;


});


}



area.innerHTML+="</div>";



});


}



mostrar();




// NOTIFICAÇÃO


Notification.requestPermission();



function verificar(){


let agora =
new Date()
.toTimeString()
.slice(0,5);



remedios.forEach(r=>{


if(r.horarios.includes(agora)){


new Notification(

"💊 Hora do remédio ❤️",

{

body:
"Está na hora de tomar "+r.nome,

vibrate:
[500,300,500]

}

);


}

});


}



setInterval(
verificar,
60000
);





// SERVICE WORKER


if("serviceWorker" in navigator){

navigator.serviceWorker.register(
"service-worker.js"
);

}