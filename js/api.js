import { Curso } from './models.js';

const HOST = "https://cursos-api.mozi.sotu.casa";

/* 
GET /cursos
*/
async function listar() {
    return fetch(`${HOST}/cursos`)
        .then(res => res.json());
}


/*
GET /cursos/123
*/
async function detalhar(id) {
    return fetch(`${HOST}/cursos/${id}`)
        .then(res => res.json());
}

/*
POST /cursos
*/
async function criar(curso) {
    return fetch(`${HOST}/cursos`, {
        method: "POST",
        body: JSON.stringify(curso),
        headers: { "Content-Type": "application/json" }
    });
}

/*
PUT /cursos/123
*/
async function atualizar(curso, id) {
    return fetch(`${HOST}/cursos/${id}`, {
        method: "PUT",
        body: JSON.stringify(curso),
        headers: { "Content-Type": "application/json" }
    });
}

/*
DELETE /cursos/123
*/
async function deletar(id) {
    return fetch(`${HOST}/cursos/${id}`, {
        method: "DELETE"
    });
}