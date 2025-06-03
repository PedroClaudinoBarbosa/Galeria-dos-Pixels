
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

function graficoGeracao(){
fetch('/dashboard/geracao')
    .then(res => res.json())
    .then(dados => {
        const labels = dados.map(item => item.geracao_console);
        const valores = dados.map(item => item.quantidade_usuarios);

        const ctx = document.getElementById('graficoPizza').getContext('2d');
        const graficoPizza = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
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
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
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

function graficoTopConsoles(){
    fetch("/dashboard/topconsoles")
    .then(res => res.json())
    .then(dados => {
        const nomes = dados.map(item => item.nome_console);
        const votos = dados.map(item => item.votos);

        const ctx = document.getElementById("graficoConsoles").getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: nomes,
                datasets: [{
                    label: "Consoles",
                    data: votos,
                    backgroundColor: "#8f32a8",
                    borderColor: "white",
                    borderWidth: 2
                    
                }]
            },
            options: {
                color: 'white',
                indexAxis: 'x', // Coloque 'x' se quiser barras verticais
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

function graficoTopGeneros(){
    fetch("/dashboard/generospopulares")
    .then(res => res.json())
    .then(dados => {
        const nomes = dados.map(item => item.nome_genero);
        const votos = dados.map(item => item.votos);

        const ctx = document.getElementById("graficoGeneros").getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: nomes,
                datasets: [{
                    label: "Genêros",
                    data: votos,
                    backgroundColor: "#0095e9",
                    borderColor: "white",
                    borderWidth: 2
                    
                }]
            },
            options: {
                color: 'white',
                indexAxis: 'x', // Coloque 'x' se quiser barras verticais
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