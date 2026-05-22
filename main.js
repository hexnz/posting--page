const formPost = document.querySelector('#form-post');
const titulo = document.querySelector('#titulo');
const conteudo = document.querySelector('#conteudo');
const tituloRenderizar = document.querySelector('#renderizador-titulo');
const conteudoRenderizar = document.querySelector('#renderizador-conteudo');
const botaoPublicar = document.querySelector('button[type="submit"]');
const statusPost = document.querySelector('#status-post');

formPost.addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        title: titulo.value,
        body: conteudo.value,
        userId: 1
    };

    botaoPublicar.disabled = true;
    botaoPublicar.innerHTML = 'Publicando...';
    statusPost.innerHTML = 'Enviando post para a API...';

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            tituloRenderizar.innerHTML = data.title;
            conteudoRenderizar.innerHTML = data.body;
            statusPost.innerHTML = 'Post publicado com sucesso!';
            formPost.reset();
        })
        .catch(function () {
            tituloRenderizar.innerHTML = 'Erro ao publicar';
            conteudoRenderizar.innerHTML = 'Não foi possível enviar o post. Tente novamente mais tarde.';
            statusPost.innerHTML = 'Falha na comunicação com a API.';
        })
        .finally(function () {
            botaoPublicar.disabled = false;
            botaoPublicar.innerHTML = 'Publicar no DevBlog';
        });
});
