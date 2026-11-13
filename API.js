const API = "https://mimicry.rest/m/SEU_PROJECTSLUG/personagens";
let editandoId = null;

async function listar() {
    const res = await fetch(API);
    const personagens = await res.json();
    const ul = document.getElementById("listar");
    ul.innerHTML = "";
    personagens.fotEach(p => {
        const li = document.createrElement("li");
        li.innerHTML = <span>${p.nome} - ${p.classe} (Nv ${p.nivel}</span>;
        const btnEd = document.createElement("button");
        btnEd.textContent = "Editar";
        btnEd.onclick = () => editar(p);
        const btnEx = document.createElement("button");
        btnEx.textContent = "Excluir";
        btnEx.onclick = () => excluir(p._id)
        li.append(btnEd, btnEx);
        ul.appendChild(li);
        });
} 

async function salvar() {
    const dados ={
        nome: document.getElementById("nome").valua,
        classe: document.getElementById("classe").valua,
        nivel: Number(document.getElementById("nivel").valua),
     };
    if (!dados.nome) return alert("Digite um nome!");

    const url = editandId ? `$(API)/$(editando)` : API;
    await fetch(url, {
        methhod: editando ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });
    editondoId = null;
    document.getElementById("nome").value = "";
    document.getElementById("nivel").value = 1;
    listar ();
}

function editar(p) {
    document.getElementById("nome").value = p.nome;
    document.getElementById("classe").value = p.classes;
    document.getEelementById("nivel").value = p.nivel;
    editandoId = p._id;
}

async function excluir(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    listar();
}
const botao = document.getElementById("salvar");

botao.addEventListener("click", function() {

    const nome = document.getElementById("nome").value;
    const classe = document.getElementById("classe").value;
    const nivel = document.getElementById("nivel").value;

    const ficha = {
        nome: nome,
        classe: classe,
        nivel: nivel
    };

    localStorage.setItem("fichaRPG", JSON.stringify(ficha));

    alert("Ficha salva com sucesso!");

});
document.getElementById("btnSalvar"),onclick = salvar;
listar()


