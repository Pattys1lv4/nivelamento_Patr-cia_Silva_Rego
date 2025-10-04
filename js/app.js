import { Curso } from './models.js'
import { listar, criar, deletar, editar } from './api.js'


//Modelo de curso
function modelo(curso) {
    return `
        <div class="card col">
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
                <div class="row justify-content-between">
                    <button 
                        type="button" 
                        class="btn btn-primary col-5" 
                        id="editar-${curso.id}"
                        data-bs-toggle="modal" 
                        data-bs-target="#menuEditar">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-danger col-5" 
                        id="deletar-${curso.id}">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
}

//Atualiza a lista de curso e coloca os botões de editar e deletar
function atualizarLista() {
    let gradeCursos = document.getElementById("gradeCursos")
    gradeCursos.innerHTML = ""

    listar().then(cursos => {

        // Modelo
        cursos.forEach((curso) => {
            gradeCursos.innerHTML += modelo(curso)
        });

        // Botão de deletar
        cursos.forEach(curso => document.getElementById(`deletar-${curso.id}`)
            .addEventListener("click", () => {
                if (confirm("Tem certeza que deseja deletar este curso?")) {
                    deletar(curso.id).then(() => {
                        alert("Curso deletado com sucesso!");
                        atualizarLista();
                    });
                }
            }));

        // Botão de editar
        cursos.forEach(curso => document.getElementById(`editar-${curso.id}`)
            .addEventListener("click", () => {
                document.getElementById("idCursoEditar").value = curso.id;
                document.getElementById("nomeCursoEditar").value = curso.nome;
                document.getElementById("categoriaCursoEditar").value = curso.categoria;
                document.getElementById("cargaHorariaEditar").value = curso.carga;
                document.getElementById("nivelCursoEditar").value = curso.nivel;
                document.getElementById("precoCursoEditar").value = curso.preco;
            }));

        estatistica(cursos);
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
    let carga = parseInt(document.getElementById("cargaHoraria").value);
    let nivel = document.getElementById("nivelCurso").value;
    let preco = parseFloat(document.getElementById("precoCurso").value);

    criar(new Curso(null, nome, categoria, carga, nivel, preco))
        .then(() => {
            alert("Curso adicionado com sucesso!");
            atualizarLista();
        });

    e.target.reset(); // limpa o formulário
});

//Edição de curso
document.getElementById("editarForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let id = document.getElementById("idCursoEditar").value;
    let nome = document.getElementById("nomeCursoEditar").value.trim();
    let categoria = document.getElementById("categoriaCursoEditar").value.trim();
    let carga = parseInt(document.getElementById("cargaHorariaEditar").value);
    let nivel = document.getElementById("nivelCursoEditar").value;
    let preco = parseFloat(document.getElementById("precoCursoEditar").value);

    editar(id, new Curso(id, nome, categoria, carga, nivel, preco))
        .then(() => {
            alert("Curso alterado com sucesso!");
            atualizarLista();
        });

    e.target.reset(); // limpa o formulário
});

//Busca de curso
document.getElementById("buscador").addEventListener("input", function () {
    const termo = this.value.toLowerCase(); // termo digitado
    const cursos = document.querySelectorAll("#gradeCursos .card"); // pega todos os cards

    cursos.forEach(card => {
        const nome = card.querySelector(".card-title").textContent.toLowerCase();
        // Mostra ou esconde conforme o termo
        if (nome.includes(termo)) {
            card.hidden = false; // mostra a coluna do card
        } else {
            card.hidden = true; // esconde a coluna do card
        }
    });
});


atualizarLista();
