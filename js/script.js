// ====== Gestão de Condomínio - JS ======
document.addEventListener("DOMContentLoaded", () => {
  // ------- LOGIN -------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const user = document.getElementById("user").value.trim();
      const pass = document.getElementById("pass").value.trim();
      const errorMsg = document.getElementById("errorMsg");

      if (user === "admin" && pass === "1234") {
        window.location.href = "dashboard.html";
      } else {
        if (errorMsg) errorMsg.textContent = "Usuário ou senha incorretos!";
      }
    });
  }

  // ------- STORAGE -------
  const LS = {
    get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  };

  let moradores  = LS.get("moradores", []);
  let despesas   = LS.get("despesas", []);
  let pagamentos = LS.get("pagamentos", []);

  // ------- MORADORES -------
  const moradorForm = document.getElementById("moradorForm");
  const moradorList = document.getElementById("moradorList");

  function renderMoradores() {
    if (!moradorList) return;
    moradorList.innerHTML = "";
    moradores.forEach(m => {
      const tr = document.createElement("tr");
      const situacao = pagamentos.some(p => p.morador === m.nome) ? "✅ Em dia" : "❌ Em atraso";
      tr.innerHTML = `
        <td>${m.nome}</td>
        <td>${m.bloco}</td>
        <td>${m.apartamento}</td>
        <td>${m.contato}</td>
        <td>${situacao}</td>
      `;
      moradorList.appendChild(tr);
    });
  }

  if (moradorForm) {
    moradorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value.trim();
      const bloco = document.getElementById("bloco").value.trim();
      const apartamento = document.getElementById("apartamento").value.trim();
      const contato = document.getElementById("contato").value.trim();
      moradores.push({ nome, bloco, apartamento, contato });
      LS.set("moradores", moradores);
      moradorForm.reset();
      renderMoradores();
    });
    renderMoradores();
  }

  // ------- DESPESAS -------
  const despesaForm = document.getElementById("despesaForm");
  const despesaList = document.getElementById("despesaList");

  function renderDespesas() {
    if (!despesaList) return;
    despesaList.innerHTML = "";
    despesas.forEach(d => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.descricao}</td>
        <td>${Number(d.valor).toLocaleString('pt-MZ')} MZN</td>
        <td>${d.data}</td>
      `;
      despesaList.appendChild(tr);
    });
  }

  if (despesaForm) {
    despesaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const descricao = document.getElementById("descricao").value.trim();
      const valor = document.getElementById("valor").value.trim();
      const data = document.getElementById("data").value;
      despesas.push({ descricao, valor, data });
      LS.set("despesas", despesas);
      despesaForm.reset();
      renderDespesas();
    });
    renderDespesas();
  }

  // ------- PAGAMENTOS -------
  const pagamentoForm = document.getElementById("pagamentoForm");
  const pagamentoList = document.getElementById("pagamentoList");
  const metodoPagamento = document.getElementById("metodoPagamento");
  const campoExtra = document.getElementById("campoExtra");

  function renderPagamentos() {
    if (!pagamentoList) return;
    pagamentoList.innerHTML = "";
    pagamentos.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.morador}</td>
        <td>${Number(p.valor).toLocaleString('pt-MZ')} MZN</td>
        <td>${p.data}</td>
        <td>${p.metodo}</td>
        <td>${p.referencia ?? ""}</td>
      `;
      pagamentoList.appendChild(tr);
    });
  }

  if (metodoPagamento && campoExtra) {
    metodoPagamento.addEventListener("change", function () {
      const v = this.value;
      campoExtra.innerHTML = "";
      if (!v) return;
      if (v === "M-Pesa") {
        campoExtra.innerHTML = `<input type="text" id="refPagamento" placeholder="Número M-Pesa (84xxxxxxx)" required>`;
      } else if (v === "mKesh") {
        campoExtra.innerHTML = `<input type="text" id="refPagamento" placeholder="Número mKesh (86xxxxxxx)" required>`;
      } else if (v === "e-Mola") {
        campoExtra.innerHTML = `<input type="text" id="refPagamento" placeholder="Número e-Mola (82/85xxxxxxx)" required>`;
      } else if (v === "Cartão") {
        campoExtra.innerHTML = `<input type="text" id="refPagamento" placeholder="Últimos 4 dígitos do cartão" required>`;
      } else if (v === "Transferência") {
        campoExtra.innerHTML = `<input type="text" id="refPagamento" placeholder="Nº de transação/Comprovativo" required>`;
      }
    });
  }

  if (pagamentoForm) {
    pagamentoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const morador = document.getElementById("moradorPagamento").value.trim();
      const valor = document.getElementById("valorPagamento").value.trim();
      const data = document.getElementById("dataPagamento").value;
      const metodo = document.getElementById("metodoPagamento").value;
      const refEl = document.getElementById("refPagamento");
      const referencia = refEl ? refEl.value.trim() : "";

      pagamentos.push({ morador, valor, data, metodo, referencia });
      LS.set("pagamentos", pagamentos);
      pagamentoForm.reset();
      if (campoExtra) campoExtra.innerHTML = "";
      renderPagamentos();
      renderMoradores();
    });
    renderPagamentos();
  }
});
