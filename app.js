let remedios =
JSON.parse(localStorage.getItem("remedios")) || [];

const lista =
document.getElementById("lista");

document.getElementById("adicionar").onclick = adicionar;

/* =========================
   FORMULÁRIO
========================= */
function abrirFormulario(){
  document
  .getElementById("formulario")
  .classList.toggle("ativo");
}

function salvar(){
  localStorage.setItem("remedios", JSON.stringify(remedios));
}

/* =========================
   ADICIONAR REMÉDIO
========================= */
function adicionar(){

  let nome = document.getElementById("nome").value.trim();
  let dias = Number(document.getElementById("dias").value);

  let horarios = document.getElementById("horarios")
  .value
  .split(",")
  .map(x => x.trim())
  .filter(Boolean);

  if(!nome || !dias || !horarios.length){
    alert("Preencha tudo ❤️");
    return;
  }

  let doses = [];

  for(let d = 1; d <= dias; d++){
    horarios.forEach(h => {
      doses.push({
        dia: d,
        hora: h,
        feito: false
      });
    });
  }

  remedios.push({
    nome,
    dias,
    doses,
    parabens: false
  });

  salvar();
  render();
}

/* =========================
   MARCAR DOSE
========================= */
function marcar(i, x){

  remedios[i].doses[x].feito =
  !remedios[i].doses[x].feito;

  finalizar(i);
  salvar();
  render();
}

/* =========================
   FINALIZAR TRATAMENTO
========================= */
function finalizar(i){

  let r = remedios[i];

  let terminou = r.doses.every(d => d.feito);

  if(terminou && !r.parabens){

    r.parabens = true;

    setTimeout(() => {
      mostrarParabens(r.nome);
    }, 300);
  }
}

/* =========================
   PROGRESSO
========================= */
function progresso(r){
  let total = r.doses.length;
  let feitos = r.doses.filter(d => d.feito).length;

  return Math.round((feitos / total) * 100);
}

/* =========================
   RENDER
========================= */
function render(){

  lista.innerHTML = "";

  remedios.forEach((r, i) => {

    let pct = progresso(r);

    let html = `
    <div class="card">

      <h2>💊 ${r.nome}</h2>

      <div class="progress">
        <div class="bar" style="width:${pct}%"></div>
      </div>

      <h3>${pct}%</h3>
    `;

    if(pct == 100){

      html += `
      <div class="parabens">
        🎉❤️
        <br>
        Tratamento concluído!
        <br><br>
        <b>${r.nome}</b>
      </div>
      `;

    } else {

      r.doses.forEach((d, x) => {

        html += `
        <label class="dose">

          <input 
            type="checkbox"
            ${d.feito ? "checked" : ""}
            onchange="marcar(${i},${x})">

          Dia ${d.dia} ⏰ ${d.hora}

        </label>
        `;

      });

    }

    html += `</div>`;
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

    <p>Você terminou:</p>
    <b>${nome}</b>

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
   🎵 MÚSICA
========================= */
const musica = document.getElementById("musicaFundo");
const btnMusica = document.getElementById("btnMusica");

let tocando = false;

if(btnMusica && musica){

  btnMusica.addEventListener("click", () => {

    if(!tocando){
      musica.play();
      btnMusica.innerText = "⏸️ Pausar";
      tocando = true;
    } else {
      musica.pause();
      btnMusica.innerText = "🎵 Música";
      tocando = false;
    }

  });

}

function criarGato(){

  const cat = document.createElement("img");

  cat.className = "cat";

  // 🐈‍⬛ IMAGEM DE GATO PERSA PRETO
  cat.src = "klaus.png";

  cat.style.left = Math.random() * window.innerWidth + "px";
  cat.style.animationDuration = (4 + Math.random() * 4) + "s";

  // tamanho variado (mais realista)
  let size = 40 + Math.random() * 40;
  cat.style.width = size + "px";

  document.body.appendChild(cat);

  setTimeout(() => {
    cat.remove();
  }, 9000);
}

setInterval(criarGato, 700);

/* =========================
   INIT
========================= */
render();