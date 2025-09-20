const HOST = "http://192.168.0.6:8080";
async function listar() {
    return await fetch(`${HOST}/cursos`)
        .then(res => res.json());
}

listar()
    .then(lista => console.log(lista));