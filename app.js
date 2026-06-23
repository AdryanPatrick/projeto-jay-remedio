// ===============================
// 💊 INÍCIO DO TRATAMENTO
// ===============================

const INICIO_TRATAMENTO = new Date("2026-06-19");

function DIAS_DESDE_INICIO(){

let hoje = new Date();
let inicio = new Date(INICIO_TRATAMENTO);

hoje.setHours(0,0,0,0);
inicio.setHours(0,0,0,0);

let diff = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));

return Math.max(1, diff + 1);

}



// ===============================
// 💊 DADOS
// ===============================

let remedios = JSON.parse(localStorage.getItem("remedios")) || [

{
nome:"Prednisona",
dias:5,
horarios:["08:00","20:00"],
tomados:gerarHistorico(4,["08:00","20:00"]),
finalizado:false
},

{
nome:"Descon",
dias:7,
horarios:["06:00","14:00","22:00"],
tomados:gerarHistorico(4,["06:00","14:00","22:00"]),
finalizado:false
},

{
nome:"Amoxicilina",
dias:14,
horarios:["09:00","21:00"],
tomados:gerarHistorico(4,["09:00","21:00"]),
finalizado:false
}

];

let tela = "hoje";



// ===============================
// 🧠 HISTÓRICO
// ===============================

function gerarHistorico(diasFeitos,horarios){

let lista=[];

for(let d=1;d<=diasFeitos;d++){
horarios.forEach(h=>{
lista.push({dia:d,hora:h});
});
}

return lista;

}



// ===============================
// 💾 SALVAR
// ===============================

function salvar(){
localStorage.setItem("remedios",JSON.stringify(remedios));
}



// ===============================
// 📳 VIBRAR
// ===============================

function vibrar(){
if(navigator.vibrate) navigator.vibrate(200);
}



// ===============================
// 🎯 TROCAR TELA
// ===============================

function setTela(t){
tela=t;
render();
}



// ===============================
// 💊 TOMAR REMÉDIO
// ===============================

function tomar(i,dia,hora){

if(!confirm("Tomou agora? ❤️")) return;

let r = remedios[i];

if(!r.tomados.find(x=>x.dia==dia && x.hora==hora)){

r.tomados.push({dia,hora});

salvar();
vibrar();

verificarRemedio(i);
verificarTudo();

render();

}

}



// ===============================
// 🧠 CORREÇÃO PRINCIPAL: DIAS REAIS POR REMÉDIO
// ===============================

function diasFeitos(r){

// conta dias únicos já marcados
return new Set(r.tomados.map(t => t.dia)).size;

}



// ===============================
// 🏠 HOJE (SEM MUDANÇA DE LÓGICA ERRADA)
// ===============================

function renderHoje(){

let html="";

let hoje = DIAS_DESDE_INICIO();

remedios.forEach((r,i)=>{

// limita visual ao dia atual
let dia = Math.min(hoje, r.dias);

r.horarios.forEach(h=>{

let feito = r.tomados.find(x=>x.dia==dia && x.hora==h);

html+=`

<div class="card">

💊 <b>${r.nome}</b><br>
Dia ${dia}/${r.dias}<br>
⏰ ${h}<br><br>

${
feito
? "✔ Já tomado"
: `<button class="action" onclick="tomar(${i},${dia},'${h}')">Tomar</button>`
}

</div>

`;

});

});

document.getElementById("conteudo").innerHTML = html;

}



// ===============================
// 📦 FALTANDO (CORRIGIDO DE VERDADE)
// ===============================

function renderFaltando(){

let html="";

remedios.forEach(r=>{

let feitos = diasFeitos(r);
let restantes = r.dias - feitos;

if(restantes < 0) restantes = 0;

html+=`

<div class="card">

💊 <b>${r.nome}</b><br><br>

${
restantes==0
? "✔ Termina hoje"
: `Faltam <b>${restantes}</b> dias`
}

</div>

`;

});

document.getElementById("conteudo").innerHTML = html;

}



// ===============================
// 📊 PROGRESSO (CORRIGIDO DE VERDADE)
// ===============================

function renderProgresso(){

let html="";

remedios.forEach(r=>{

let feitos = diasFeitos(r);
let pct = Math.round((feitos / r.dias) * 100);

if(pct>100) pct=100;

html+=`

<div class="card">

<h3>💊 ${r.nome}</h3>

<div style="background:#eee;height:12px;border-radius:20px;overflow:hidden">
<div style="width:${pct}%;height:100%;background:#ff4f91;transition:.5s"></div>
</div>

<p><b>${pct}%</b></p>

</div>

`;

});

document.getElementById("conteudo").innerHTML = html;

}



// ===============================
// 🎯 RENDER
// ===============================

function render(){

if(tela=="hoje") renderHoje();
if(tela=="faltando") renderFaltando();
if(tela=="progresso") renderProgresso();

}



// ===============================
// 🎉 FINAL REMÉDIO
// ===============================

function verificarRemedio(i){

let r = remedios[i];

let total = r.dias * r.horarios.length;

if(r.tomados.length >= total && !r.finalizado){

r.finalizado = true;

salvar();

mostrarModal(`🎉 Você terminou ${r.nome} ❤️`);

}

}



// ===============================
// 💖 FINAL GERAL
// ===============================

function verificarTudo(){

if(remedios.every(r=>r.finalizado)){

setTimeout(()=>{
telaFinal();
},1500);

}

}



// ===============================
// 🎉 MODAL
// ===============================

function mostrarModal(texto){

let modal = document.createElement("div");

modal.className="modal";

modal.innerHTML=`

<div class="modal-box">

<h1>🎉❤️</h1>

<h2>${texto}</h2>

<img src="beijo.png" class="foto-final">

<p>Estou muito feliz por você 🥰</p>

<button onclick="this.parentElement.parentElement.remove()">
Continuar ❤️
</button>

</div>

`;

document.body.appendChild(modal);

}



// ===============================
// 🏆 FINAL TOTAL
// ===============================

function telaFinal(){

document.body.innerHTML=`

<div class="final">

<h1>❤️ VOCÊ CONSEGUIU ❤️</h1>

<img src="foto.jpg" class="foto-final">

<h2>Você terminou todo o tratamento 🎉</h2>

<p>Tenho muito orgulho de você ❤️</p>

</div>

<canvas id="canvas"></canvas>

`;

}



// ===============================
// 🚀 START
// ===============================

render();