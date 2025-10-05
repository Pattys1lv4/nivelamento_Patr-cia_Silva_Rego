

const HOST = "http://sotu.casa";

/* 
GET /cursos
*/
export async function listar() {
    return fetch(`${HOST}/cursos`)
        .then(res => res.json())
}


/*
GET /cursos/123
*/
export async function buscar(id) {
    return fetch(`${HOST}/cursos/${id}`)
        .then(res => res.json());
}

/*
POST /cursos
*/
export async function criar(curso) {
    return fetch(`${HOST}/cursos`, {
        method: "POST",
        body: JSON.stringify(curso),
        headers: { "Content-Type": "application/json" }
    });
}

/*
PUT /cursos/123
*/
export async function editar(id, curso) {
    return fetch(`${HOST}/cursos/${id}`, {
        method: "PUT",
        body: JSON.stringify(curso),
        headers: { "Content-Type": "application/json" }
    });
}

/*
DELETE /cursos/123
*/
export async function deletar(id) {
    return fetch(`${HOST}/cursos/${id}`, {
        method: "DELETE"
    });
}
