

let cursos = []
//Modelo de curso
function modelo(curso) {
    return `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h4 class="card-title">${curso.nome}</h4>
                <div class="row">
                    <h6 class="card-subtitle mb-2 text-body-secondary col">${curso.nivel}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary col">${curso.categoria}</h6>
                </div>
                <div class="row">
                    <p class="card-text col">${curso.preco}</p>
                    <p class="card-text col">${curso.carga}</p>
                </div>
            </div>
        </div>
        `;
}

//Atualiza a lista de curso
function atualizarLista(lista = cursos) {
    let container = document.getElementById("cursoGrid")
    container.innerHTML = ""

    lista.forEach((curso) => {
        container.innerHTML += modelo(curso)
    });
}

//Estatísticas
function estatistica() {
    let totalCursos = document.getElementById("totalCursos")
    totalCursos.innerText = cursos.length

    let cargaHoraria = document.getElementById("cargaHoraria")
    cargaHoraria.innerText = cursos.reduce((tempo, curso) => tempo + parseInt(curso.carga), 0)

    let cursoGratuito = document.getElementById("cursoGratuito")
    cursoGratuito.innerText = cursos.filter(curso => curso.preco === "Gratuito").length
}

//Cadastro de curso
document.getElementById("cursoForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let nome = document.getElementById("nomeCurso").value.trim();
    let categoria = document.getElementById("categoria").value.trim();
    let carga = parseInt(document.getElementById("carga").value, 10);
    let nivel = document.getElementById("nivel").value;
    let preco = parseFloat(document.getElementById("preco").value);

    if (!nome || !categoria || isNaN(carga) || isNaN(preco)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }
    else {
        alert("Curso adicionado com sucesso!")
    }

    cursos.push({ nome, categoria, carga, nivel, preco });

    atualizarLista();
    estatistica();

    e.target.reset(); // limpa o formulário
});

//Busca de curso
document.getElementById("buscador").addEventListener("input", (e) => {
    let termo = e.target.value.toLowerCase();
    let filtrados = cursos.filter((curso) =>
        curso.nome.toLowerCase().includes(termo)
    );
    atualizarLista(filtrados);
});

/*let cursos = [
    { nome: "curso", nivel: "graduação", categoria: "EaD", preco: "R$30.00", carga: "30h" },
    { nome: "abc", nivel: "graduação", categoria: "EaD", preco: "R$30.00", carga: "30h" },
    { nome: "cba", nivel: "graduação", categoria: "EaD", preco: "R$30.00", carga: "30h" }
]

let tudoJunto;
//
let curso1 = cursos[0];
let modelo1 = modelo(curso1)
console.log(modelo1)

let curso2 = cursos[1];
let modelo2 = modelo(curso2)
console.log(modelo2)

//
console.log(`Valor de tudoJunto: ${tudoJunto}`);*/

