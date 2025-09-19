export class Curso {
    constructor(
        titulo,
        categoria,
        carga,
        nivel,
        preco
    ) {
        this.titulo = titulo;
        this.categoria = categoria;
        this.carga = carga;
        this.nivel = nivel;
        this.preco = preco;
    }
    gratuito() {
        if (!this.preco) {
            return true
        }
        else {
            return false
        }
    }
}

export const categorias = [
    "Presencial",
    "Semi-Presencial",
    "EaD"
];

export const niveis = [
    "Técnico",
    "Graduação",
    "Pós-Graduação"
];

