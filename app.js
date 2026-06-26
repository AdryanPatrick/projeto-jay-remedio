let remedios =
JSON.parse(localStorage.getItem("remedios")) || [];

const lista = document.getElementById("lista");

/* =========================
   INICIALIZAÇÃO SEGURA
========================= */
window.addEventListener("DOMContentLoaded", () => {

  const btnAdicionar = document.getElementById("adicionar");
  const btnMusica = document.getElementById("btnMusica");
  const musica = document.getElementById("musicaFundo");

  if (btnAdicionar) {
    btnAdicionar.addEventListener("click", adicionar);
  }

 /* =========================
   🎵 MÚSICA (MELHORADA PARA CELULAR)
========================= */

const musica = document.getElementById("musicaFundo");
const btnMusica = document.getElementById("btnMusica");

let tocando = false;

// configuração inicial (evita cortes rápidos)
if (musica) {
  musica.loop = true;
  musica.volume = 0.7;
  musica.preload = "auto";
}

// botão de controle
if (btnMusica && musica) {

  btnMusica.addEventListener("click", async () => {
    try {

      if (!tocando) {
        await musica.play();
        tocando = true;
        btnMusica.innerText = "⏸️ Pausar";
      } else {
        musica.pause();
        tocando = false;
        btnMusica.innerText = "🎵 Música";
      }

    } catch (err) {
      console.log("Erro ao tocar música:", err);
    }
  });
}

// 🔥 tenta retomar quando volta pro app
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && tocando) {
    musica.play().catch(() => {});
  }
});

// 🔥 tenta recuperar se o celular pausar sozinho
musica.addEventListener("pause", () => {
  if (tocando) {
    setTimeout(() => {
      musica.play().catch(() => {});
    }, 1000);
  }
});
  render();
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
   ADICIONAR
========================= */
function adicionar(){

  let nome = document.getElementById("nome").value.trim();
  let dias = Number(document.getElementById("dias").value);

  let horarios = document.getElementById("horarios")
  .value.split(",")
  .map(x=>x.trim())
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

  remedios.push({
    nome,
    dias,
    doses,
    parabens:false
  });

  salvar();
  render();
}

/* =========================
   MARCAR
========================= */
function marcar(i,x){

  remedios[i].doses[x].feito =
  !remedios[i].doses[x].feito;

  finalizar(i);
  salvar();
  render();
}

/* =========================
   FINALIZAR
========================= */
function finalizar(i){

  let r = remedios[i];

  if(r.doses.every(d=>d.feito) && !r.parabens){
    r.parabens = true;
    setTimeout(()=>mostrarParabens(r.nome),300);
  }
}

/* =========================
   PROGRESSO
========================= */
function progresso(r){
  let total = r.doses.length;
  let feitos = r.doses.filter(d=>d.feito).length;
  return Math.round((feitos/total)*100);
}

/* =========================
   RENDER
========================= */
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

    if(pct==100){

      html+=`
      <div class="parabens">
        🎉❤️<br>
        Tratamento concluído!<br><br>
        <b>${r.nome}</b>
      </div>
      `;

    } else {

      r.doses.forEach((d,x)=>{
        html+=`
        <label class="dose">
          <input type="checkbox"
          ${d.feito?"checked":""}
          onchange="marcar(${i},${x})">

          Dia ${d.dia} ⏰ ${d.hora}
        </label>
        `;
      });

    }

    html+=`</div>`;
    lista.innerHTML += html;

  });
}

/* =========================
   MODAL PARABÉNS
========================= */
function mostrarParabens(nome){

  let modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
  <div class="parabens">

    <h1>🎉❤️</h1>
    <h2>Parabéns!</h2>

    <p>${nome}</p>

    <img src="beijo.png" class="foto-beijo">

    <p class="mensagem-amor">
    "Eu te amo meu bem e sempre vou cuidar de você, você é meu Lebenslangerschicksalsschatz"
    </p>

    <button class="btn-continuar"
    onclick="this.parentElement.parentElement.remove()">
      Continuar ❤️
    </button>

  </div>
  `;

  document.body.appendChild(modal);
}

/* =========================
   🐈‍⬛ GATINHOS
========================= */
function criarGato(){

  const cat = document.createElement("img");

  cat.className = "cat";

  cat.src = "klaus.png";

  cat.style.left = Math.random() * window.innerWidth + "px";
  cat.style.width = (40 + Math.random() * 50) + "px";
  cat.style.animationDuration = (4 + Math.random() * 4) + "s";
  cat.style.opacity = "0.8";

  document.body.appendChild(cat);

  setTimeout(()=>{
    cat.remove();
  },9000);
}

setInterval(criarGato,700);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("SW registrado"))
    .catch(err => console.log("Erro SW:", err));
}