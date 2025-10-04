import { Curso } from './models.js'
import { listar, criar, deletar } from './api.js'


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
                    <p class="card-text col">${curso.preco ? `R$ ${curso.preco.toFixed(2)}` : "Grátis"}</p>
                    <p class="card-text col">${curso.carga} h</p>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-danger" id="deletar-${curso.id}">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>

            </div>
        </div>
        `;
}

//Atualiza a lista de curso
function atualizarLista() {
    let container = document.getElementById("cursoGrid")
    container.innerHTML = ""

    listar().then(lista => {
        lista.forEach((curso) => {
            container.innerHTML += modelo(curso)
        });
        lista.forEach(curso => {
            document.getElementById(`deletar-${curso.id}`).addEventListener("click", () => deletarCurso(curso.id));
        })
        estatistica(lista);
    });

}

//Estatísticas
function estatistica(cursos) {
    let totalCursos = document.getElementById("totalCursos")
    totalCursos.innerText = cursos.length

    let cargaHoraria = document.getElementById("cargaHorariaTotal")
    cargaHoraria.innerText = cursos.reduce((tempo, curso) => tempo + parseInt(curso.carga), 0)

    let cursosGratis = document.getElementById("cursosGratis")
    cursosGratis.innerText = cursos.filter(curso => !curso.preco).length
}

//Cadastro de curso
document.getElementById("cursoForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let nome = document.getElementById("nomeCurso").value.trim();
    let categoria = document.getElementById("categoriaCurso").value.trim();
    let carga = parseInt(document.getElementById("cargaHoraria").value, 10);
    let nivel = document.getElementById("nivelCurso").value;
    let preco = parseFloat(document.getElementById("precoCurso").value);

    criar(new Curso(null, nome, categoria, carga, nivel, preco))
        .then(() => {
            alert("Curso adicionado com sucesso!");
            atualizarLista();
        });

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

//Deletar curso
function deletarCurso(id) {
    if (confirm("Tem certeza que deseja deletar este curso?")) {
        deletar(id).then(() => {
            alert("Curso deletado com sucesso!");
            atualizarLista();
        });
    }
}

atualizarLista();
