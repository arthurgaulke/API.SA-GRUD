const API = "https://6afb502f730c1d152f337410.mockapi.io/api/v1/ficha-personagens";
let editandoId = null;

const classesDoJogo = ["Atirador", "Mago", "Guerreiro", "Ladino", "Clérigo"]

function idDe(p) {
  return p._id || p.id;
}

async function listar() {
  const res = await fetch(API);
  const personagens = await res.json();
  const ul = document.getElementById("lista");
  ul.innerHTML = "";

  personagens.forEach(p => {
    let classeFinal = p.classe;
    if (!classesDoJogo.includes(classeFinal)) {
        classeFinal = classesDoJogo[Math.floor(Math.random() * classesDoJogo.length)];
    }

    const li = document.createElement("li");
    li.innerHTML = `<span>${p.nome} - ${classeFinal} (Nv ${p.nivel})</span>`;

    const btnEd = document.createElement("button");
    btnEd.textContent = "Editar";
    btnEd.onclick = () => editar(p);

    const btnEx = document.createElement("button");
    btnEx.textContent = "Excluir";
    btnEx.onclick = () => excluir(idDe(p));

    li.append(btnEd, btnEx);
    ul.appendChild(li);
  });
}

async function salvar() {
  const dados = {
    nome: document.getElementById("nome").value,
    classe: document.getElementById("classe").value,
    nivel: Number(document.getElementById("nivel").value),
  };
  if (!dados.nome) return alert("Digite um nome!");

  const url = editandoId ? `${API}/${editandoId}` : API;
  await fetch(url, {
    method: editandoId ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  editandoId = null;
  document.getElementById("nome").value = "";
  document.getElementById("nivel").value = 1;
  listar();
}

function editar(p) {
  document.getElementById("nome").value = p.nome;
  document.getElementById("classe").value = p.classe;
  document.getElementById("nivel").value = p.nivel;
  editandoId = idDe(p);
}

async function excluir(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  listar();
}

document.getElementById("btnSalvar").onclick = salvar;
listar();

//file:///C:/Users/arthu/API.SA-GRUD/index.html//
