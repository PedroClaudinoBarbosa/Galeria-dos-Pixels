const mario = document.querySelector('.mario_scroll');
mario.style.transform = `translate(-50%, ${scrollY * 0.3}px)`;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    mario.style.transform = `translate(-50%, ${scrollY * 0.3}px)`;
});

function telaLogin() {
    div_prologo.innerHTML = `
            <div class="login">
                <h1>Entrar na Galeria</h1>
                <p>Email:</p>
                <input type="text" placeholder="Email" id="ipt_email">
                <p>Senha:</p>
                <input type="password" placeholder="Senha" id="ipt_senha">
                <div id="div_alerta"></div>
                <button onclick="entrar()">Entrar</button>
                <p>Não tem uma conta? <span id="clique_aqui" onclick="telaCadastrar()">Clique aqui</span> para criar uma.</p>
            </div>     
        `;
}

function telaCadastrar() {
    div_prologo.innerHTML = `
            <div class="login">
                <h1>Entrar na Galeria</h1>
                <p>Nome de usuário:</p>
                <input type="text" placeholder="Nome de usuário" id="ipt_nome";>
                <p>Email:</p>
                <input type="text" placeholder="Email" id="ipt_email">
                <div id="div_emailAlerta"></div>
                <p>Senha:</p>
                <input type="text" placeholder="Senha" id="ipt_senha">
                <p>Confirme a senha:</p>
                <input type="text" placeholder="Confirme a senha" id="ipt_senhaConfirmar">
                <div id="div_senhaAlerta"></div>
                <button onclick="cadastrar()">Criar conta</button>

                <p>Já tem uma conta? <span id="clique_aqui" onclick="telaLogin()">Clique aqui</span> para entrar na galeria.</p>
            </div> 
        `;
}


function cadastrar() {
    let validacao = true;
    var nome = ipt_nome.value;
    var email = ipt_email.value;
    var senha = ipt_senha.value;
    var senhaConfirmar = ipt_senhaConfirmar.value;

    div_senhaAlerta.innerHTML = "";
    div_emailAlerta.innerHTML = "";

    // Verificando se há algum campo em branco
    if (nome == "" || email == "" || senha == "" || senhaConfirmar == "") {
        div_senhaAlerta.innerHTML = `<p class="vermelho">❗Todos os campos precisam ser preenchidos!</p>`;
        return false;
    }

    if (!email.includes('@') || !email.endsWith('.com')) {
        div_emailAlerta.innerHTML = `<p class="vermelho">❗Digite um e-mail válido com "@" e ".com".</p>`;
        validacao = false;
    }

    if (senha !== senhaConfirmar) { // Verifica se as senha coincidem
        div_senhaAlerta.innerHTML = `<p class="vermelho">❗As senhas não coincidem.</p>`;
        validacao = false;
    }

    if (senha.length < 6 || !/[A-Z]/.test(senha) || !/[a-z]/.test(senha) || !/[^a-zA-Z0-9]/.test(senha)) { // Verifica se a senha tem pelo menos 6 dígitos
        div_senhaAlerta.innerHTML += `<p class="vermelho">❗A senha precisa ter pelo menos 6 dígitos, <br>uma letra maiúscula, uma letra minúscula um símbolo.</p>`;
        validacao = false;
    }

    if (validacao === false) {
        return false;
    }
    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                div_senhaAlerta.innerHTML = `<p class="verde">👍 Cadastro realizado com sucesso! Retorne para a tela de login!</p>`;
                limparFormulario();
            } else {
                div_emailAlerta.innerHTML = `<p class="vermelho">Email já cadastrado!</p>`;
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

function entrar() {
    div_alerta.innerHTML = "";

    var email = ipt_email.value;
    var senha = ipt_senha.value;

    if (email == "" || senha == "") {
        div_alerta.innerHTML = `<p class="vermelho">❗Todos os campos precisam ser preenchidos!</p>`;
        return false;
    }

    console.log("FORM LOGIN: ", email);
    console.log("FORM SENHA: ", senha);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                window.location = "galeria.html";
 // apenas para exibir o loading

            });

        } else {
            div_alerta.innerHTML = `<p class="vermelho">❗Houve um erro ao tentar realizar o login!</p>`;
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}