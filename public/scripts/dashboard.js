window.onload = function () {
    const consoleSalvo = sessionStorage.CONSOLE_USUARIO;
    const generoSalvo = sessionStorage.GENERO_USUARIO;

    if (consoleSalvo) {
        const selectConsole = document.getElementById("consoleFavorito");
        selectConsole.value = consoleSalvo;
    }
    if (generoSalvo) {
        const selectGenero = document.getElementById("generoFavorito");
        selectGenero.value = generoSalvo;
    }

    // Exibe o nome do usuário
    b_usuario.innerHTML = `<span class="amarelo">${sessionStorage.NOME_USUARIO}</span>`;

    obterDadosConsolesGeracao();
    obterDadosTopConsoles();
    obterDadosGenerosPopulares();
};

function consoleSelecionado() {
    const opcaoSelecionada = consoleFavorito.value;
    console.log("Console selecionado:", opcaoSelecionada);
    console.log(sessionStorage.EMAIL_USUARIO);

    fetch("/opinioes/cadastrarConsole", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            console_idServer: opcaoSelecionada,
            console_emailServer: sessionStorage.EMAIL_USUARIO
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log(`<p class="verde">👍 Console Enviado com Sucesso!</p>`);
            sessionStorage.CONSOLE_USUARIO = opcaoSelecionada;
            console.log("Console:" + sessionStorage.CONSOLE_USUARIO);
        } else {
            throw "Houve um erro ao tentar realizar o cadastro do console!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}
function generoSelecionado() {
    const opcaoSelecionada = generoFavorito.value;
    console.log("Genero selecionado:", opcaoSelecionada);
    console.log(sessionStorage.EMAIL_USUARIO);

    fetch("/opinioes/cadastrarGenero", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            genero_idServer: opcaoSelecionada,
            console_emailServer: sessionStorage.EMAIL_USUARIO
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log(`<p class="verde">👍 Console Enviado com Sucesso!</p>`);
            sessionStorage.GENERO_USUARIO = opcaoSelecionada;
            console.log("Console:" + sessionStorage.GENERO_USUARIO);
        } else {
            throw "Houve um erro ao tentar realizar o cadastro do console!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

obterDadosConsolesGeracao();
let graficoGeracaoConsoles = null;

function graficoGeracao(){
fetch('/dashboard/geracao')
    .then(res => res.json())
    .then(dados => {
        const labels = dados.map(item => item.geracao_console);
        const valores = dados.map(item => item.quantidade_usuarios);

        const ctx = document.getElementById('graficoPizza').getContext('2d');

        if (graficoGeracaoConsoles){
            graficoGeracaoConsoles.destroy();
        }
        graficoGeracaoConsoles = new Chart(ctx, {
            type: 'pie',
            data: 
            {
                
                labels: labels,
                label: 'Quantidade de usuários',
                datasets: [{
                    data: valores,
                    backgroundColor: [
                        '#5a6988',
                        '#66E5ED', 
                        '#1E49A3', 
                        '#43F048', 
                        '#F9C38A', 
                        '#7E150A',
                        '#F8B509', 
                        '#F2305E', 
                        '#7D1B7E',
                        '#181425' 
                    ],
                    borderWidth: 2
                }]
            }
            ,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'rgb(255, 255, 255)'
                        }
                    },
                    title: {
                        display: true,
                        color: 'white',
    
                    }
                }
            }
        });
    })
    .catch(erro => {
        console.error("Erro ao carregar dados do gráfico:", erro);
    });
}

function obterDadosConsolesGeracao() {
    fetch(`/dashboard/geracao`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                graficoGeracao();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function generoSelecionado() {
    const opcaoSelecionada = generoFavorito.value;
    console.log("Genero selecionado:", opcaoSelecionada);
    console.log(sessionStorage.EMAIL_USUARIO);

    fetch("/opinioes/cadastrarGenero", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            genero_idServer: opcaoSelecionada,
            console_emailServer: sessionStorage.EMAIL_USUARIO
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log(`<p class="verde">👍 Console Enviado com Sucesso!</p>`);
            sessionStorage.GENERO_USUARIO = opcaoSelecionada;
            console.log("Console:" + sessionStorage.GENERO_USUARIO);
        } else {
            throw "Houve um erro ao tentar realizar o cadastro do console!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function obterDadosTopConsoles() {
    fetch(`/dashboard/topconsoles`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                graficoTopConsoles();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}


obterDadosGenerosPopulares();
let graficoGenerosPopulares = null;
function graficoTopConsoles(){
    fetch("/dashboard/topconsoles")
    .then(res => res.json())
    .then(dados => {
        const nomes = dados.map(item => item.nome_console);
        const votos = dados.map(item => item.votos);

        const ctx = document.getElementById("graficoConsoles").getContext("2d");

        if (graficoGenerosPopulares){
            graficoGenerosPopulares.destroy();
        }

        graficoGenerosPopulares = new Chart(ctx, {
            type: "bar",
            data: {
                labels: nomes,
                datasets: [{
                
                    label: 'Quantidade de usuários',
                    data: votos,
                    backgroundColor: "#8f32a8",
                    borderColor: "white",
                    borderWidth: 2
                    
                }]
            },
            options: {

                color: 'white',
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    });
}


obterDadosGenerosPopulares();

let graficoGeneros = null;

function graficoTopGeneros(){
    fetch("/dashboard/generospopulares")
    .then(res => res.json())
    .then(dados => {
        const nomes = dados.map(item => item.nome_genero);
        const votos = dados.map(item => item.votos);

        const ctx = document.getElementById("graficoGeneros").getContext("2d");

        if (graficoGeneros) {
            graficoGeneros.destroy();
        }

        graficoGeneros = new Chart(ctx, {
            type: "bar",
            data: {
                labels: nomes,
                datasets: [{
                    label: 'Quantidade de usuários',
                    data: votos,
                    backgroundColor: "orange",
                    borderColor: "white",
                    borderWidth: 2
                    
                }]
            },
            
            options: {
                color: 'white',
                indexAxis: 'y', 
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    });
}

function obterDadosGenerosPopulares() {
    fetch(`/dashboard/generospopulares`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                graficoTopGeneros();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

setInterval(obterDadosGenerosPopulares, 10000);
setInterval(obterDadosTopConsoles, 10000);
setInterval(obterDadosConsolesGeracao, 10000);

let graficoJogos = null; 
atualizarGraficoJogos();
function graficoJogosFavoritos(){
    fetch("/dashboard/obterDadosJogosFavoritos")
    .then(res => res.json())
    .then(dados => {
        const nomes = dados.map(item => item.nome_jogo);
        const votos = dados.map(item => item.quantidade_usuarios);

        const ctx = document.getElementById("graficosJogos").getContext("2d");        
        if (graficoJogos) {
            graficoJogos.destroy();
        }
        
        graficoJogos = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: nomes,
                datasets: [{
                    label: 'Quantidade de usuários',
                    data: votos,
                    backgroundColor: [
                        '#E6194B', '#3CB44B', '#FFE119', '#4363D8', 
                        '#F58231', '#911EB4', '#46F0F0', '#F032E6',
                        '#BCF60C', '#FABEBE'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'white',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    })
    .catch(error => {
        console.error('Erro ao obter dados:', error);
    });
}

// Inserir Jogos Favoritos
function checkboxMudou(checkbox) {
  if (checkbox.checked) {
    const opcaoSelecionada = checkbox.value;
    console.log("Console Marcado:", opcaoSelecionada);
    console.log(sessionStorage.EMAIL_USUARIO);

    fetch("/opinioes/cadastrarJogoFavorito", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            console_jogoFavoritoServer: opcaoSelecionada,
            console_idUsuarioServer: sessionStorage.ID_USUARIO
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log(`<p class="verde">👍 Jogo Enviado com Sucesso!</p>`);
            console.log("Console:" + sessionStorage.CONSOLE_USUARIO);
        } else {
            throw "Houve um erro ao tentar realizar o cadastro do console!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
  } else {
    const opcaoSelecionada = checkbox.value;
    console.log("Console Marcado:", opcaoSelecionada);
    console.log(sessionStorage.EMAIL_USUARIO);

    fetch("/opinioes/removerJogoFavorito", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            console_jogoFavoritoServer: opcaoSelecionada,
            console_idUsuarioServer: sessionStorage.ID_USUARIO
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log(`<p class="verde">👍 Jogo Removido com Sucesso!</p>`);
            console.log("Console:" + sessionStorage.CONSOLE_USUARIO);
        } else {
            throw "Houve um erro ao tentar realizar o cadastro do console!";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
  }
}

// Puxar Jogos Favoritos

function atualizarGraficoJogos(){
    fetch(`/dashboard/obterDadosJogosFavoritos`, { cache: 'no-store' })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro na resposta da API');
    })
    .then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();
        graficoJogosFavoritos();
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
    });
}
setInterval(atualizarGraficoJogos, 10000);


// Atualizar Selects do Usuário
function atualizarSelects() {
    const idUsuario = sessionStorage.ID_USUARIO;
    
    if (!idUsuario) {
        console.error("ID do usuário não encontrado!");
        return;
    }

    fetch(`/dashboard/atualizarSelects?idUsuario=${idUsuario}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro na resposta da API');
    })
    .then(function (resposta) {
        console.log(`Jogos favoritos do usuário: ${JSON.stringify(resposta)}`);
        
        document.querySelectorAll('input[name="jogoFavorito"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        resposta.forEach(jogo => {
            const checkbox = document.querySelector(`input[name="jogoFavorito"][value="${jogo.fkIdJogoFavorito}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    })
    .catch(function (error) {
        console.error(`Erro ao obter jogos favoritos: ${error.message}`);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.ID_USUARIO) {
        atualizarSelects();
    } else {
        console.error("Usuário não autenticado");
    }
});