let chamados = [];

function horaAtual() {
  const agora = new Date();
  return agora.toLocaleTimeString();
}

function log(msg) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += `<p>[${horaAtual()}] ${msg}</p>`;
}

function simularFalha() {
  document.getElementById("statusServidor").innerText = "Servidor Web: 🔴 Offline";

  log("Servidor caiu");

  const chamado = {
    id: Date.now(),
    problema: "Servidor Web Offline",
    status: "Aberto"
  };

  chamados.push(chamado);

  log("Chamado criado automaticamente");

  renderizarChamados();
}

function mudarStatus(id, novoStatus) {
  chamados = chamados.map(c => {
    if (c.id === id) {
      c.status = novoStatus;
      log(`Chamado atualizado para ${novoStatus}`);
    }
    return c;
  });

  renderizarChamados();
}

function renderizarChamados() {
  const div = document.getElementById("chamados");
  div.innerHTML = "";

  chamados.forEach(c => {
    div.innerHTML += `
      <div class="card">
        <p>${c.problema}</p>
        <select onchange="mudarStatus(${c.id}, this.value)">
          <option ${c.status === "Aberto" ? "selected" : ""}>Aberto</option>
          <option ${c.status === "Em andamento" ? "selected" : ""}>Em andamento</option>
          <option ${c.status === "Resolvido" ? "selected" : ""}>Resolvido</option>
        </select>
      </div>
    `;
  });
}