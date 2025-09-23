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

let cursos = [
    { nome: "curso", nivel: "graduação", categoria: "EaD", preco: "R$30.00", carga: "30h" },
    { nome: "abc", nivel: "graduação", categoria: "EaD", preco: "R$30.00", carga: "30h" },
    { nome: "cba", nivel: "graduação", categoria: "EaD", preco: "R$30.00", carga: "30h" }
]

for (let i of cursos) {
    document.getElementById("cursoGrid").innerHTML = modelo(i);
};

