export class Curso {
    constructor(
        id,
        nome,
        categoria,
        carga,
        nivel,
        preco
    ) {
        this.id = id;
        this.nome = nome;
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

