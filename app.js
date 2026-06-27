let remedios = JSON.parse(localStorage.getItem("remedios")) || [];
const lista = document.getElementById("lista");

/* =========================
   🔥 RELOGIOS INTELIGENTES
========================= */
let alarmesAtivos = {};

/* =========================
   INIT
========================= */
window.addEventListener("DOMContentLoaded", () => {

  const btnAdicionar = document.getElementById("adicionar");
  const btnMusica = document.getElementById("btnMusica");
  const musica = document.getElementById("musicaFundo");

  if (btnAdicionar) {
    btnAdicionar.addEventListener("click", adicionar);
  }

  let tocando = false;

  if (btnMusica && musica) {
    btnMusica.addEventListener("click", async () => {
      if (!tocando) {
        await musica.play();
        btnMusica.innerText = "⏸️ Pausar";
        tocando = true;
      } else {
        musica.pause();
        btnMusica.innerText = "🎵 Música";
        tocando = false;
      }
    });
  }

  render();

  // 🔥 reativa alarmes salvos
  remedios.forEach(r => iniciarRepeticaoInteligente(r));
});

/* =========================
   FORM
========================= */
function abrirFormulario(){
  document.getElementById("formulario").classList.toggle("ativo");
}

/* =========================
   SALVAR
========================= */
function salvar(){
  localStorage.setItem("remedios", JSON.stringify(remedios));
}

/* =========================
   ADICIONAR (COM SMART)
========================= */
function adicionar(){

  let nome = document.getElementById("nome").value.trim();
  let dias = Number(document.getElementById("dias").value);

  let horarios = document.getElementById("horarios")
  .value.split(",")
  .map(x => x.trim())
  .filter(Boolean);

  if(!nome || !dias || !horarios.length){
    alert("Preencha tudo ❤️");
    return;
  }

  let doses = [];

  for(let d=1; d<=dias; d++){
    horarios.forEach(h=>{
      doses.push({
        dia:d,
        hora:h,
        feito:false
      });
    });
  }

  const remedio = {
    nome,
    dias,
    horarios,
    doses,
    parabens:false
  };

  remedios.push(remedio);

  salvar();
  render();

  iniciarRepeticaoInteligente(remedio);
}

/* =========================
   🔥 REPETIÇÃO INTELIGENTE
========================= */
function iniciarRepeticaoInteligente(remedio){

  remedio.horarios.forEach(hora => {
    agendarHora(remedio.nome, hora);
  });

}

/* =========================
   ⏰ AGENDADOR
========================= */
function agendarHora(nome, horaStr){

  const [h, m] = horaStr.split(":");

  const agora = new Date();
  const proximo = new Date();

  proximo.setHours(h, m, 0, 0);

  if(proximo < agora){
    proximo.setDate(proximo.getDate() + 1);
  }

  const delay = proximo - agora;

  const id = nome + "_" + horaStr;

  if(alarmesAtivos[id]){
    clearTimeout(alarmesAtivos[id]);
  }

  alarmesAtivos[id] = setTimeout(() => {

    mostrarNotificacao(nome);

    agendarHora(nome, horaStr);

  }, delay);
}

/* =========================
   🔔 NOTIFICAÇÃO
========================= */
function mostrarNotificacao(nome){

  if(Notification.permission !== "granted") return;

  new Notification("💊 Hora do remédio!", {
    body: `Está na hora de tomar: ${nome}`,
    icon: "/projeto-jay-remedio/icone192.png"
  });
}

/* =========================
   RESTANTE DO SEU CÓDIGO (SEM MEXER NO ESTILO)
========================= */

function marcar(i,x){
  remedios[i].doses[x].feito = !remedios[i].doses[x].feito;
  salvar();
  render();
}

function progresso(r){
  let total = r.doses.length;
  let feitos = r.doses.filter(d=>d.feito).length;
  return Math.round((feitos/total)*100);
}

function render(){

  lista.innerHTML = "";

  remedios.forEach((r,i)=>{

    let pct = progresso(r);

    let html = `
    <div class="card">

      <h2>💊 ${r.nome}</h2>

      <div class="progress">
        <div class="bar" style="width:${pct}%"></div>
      </div>

      <h3>${pct}%</h3>
    `;

    r.doses.forEach((d,x)=>{
      html += `
      <label class="dose">
        <input type="checkbox"
        ${d.feito?"checked":""}
        onchange="marcar(${i},${x})">

        Dia ${d.dia} ⏰ ${d.hora}
      </label>
      `;
    });

    html += `</div>`;
    lista.innerHTML += html;
  });
}

/* =========================
   🐈‍⬛ GATINHOS VOLTANDO
========================= */

function criarGato(){

  const cat = document.createElement("img");

  cat.className = "cat";

  cat.src = "klaus.png";

  cat.style.left =
  Math.random() * window.innerWidth + "px";

  cat.style.width =
  (40 + Math.random() * 50) + "px";

  cat.style.animationDuration =
  (4 + Math.random() * 4) + "s";

  cat.style.opacity = "0.8";

  document.body.appendChild(cat);


  setTimeout(()=>{

    cat.remove();

  },9000);

}


setInterval(criarGato,700);