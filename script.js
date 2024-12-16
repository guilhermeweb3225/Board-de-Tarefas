// Seleção de elementos do DOM
const inputTarefa = document.getElementById('input-1');
const inputEtiqueta = document.getElementById('input-2');
const containerTarefas = document.getElementById('box-3');
const botaoAdicionar = document.getElementById('adicionar');
const contadorTarefas = document.getElementById('contador');
const contadorTarefasConcluidas = document.getElementById('concluidasTarefas');

// Variáveis de contagem
let totalTarefas = 0;
let totalTarefasConcluidas = 0;

// Função para carregar dados do localStorage
const carregarDoLocalStorage = (chave, valorPadrao = 0) => {
    return localStorage.getItem(chave) ? parseInt(localStorage.getItem(chave)) : valorPadrao;
};

// Função para salvar dados no localStorage
const salvarNoLocalStorage = (chave, valor) => {
    localStorage.setItem(chave, valor);
};

// Função para atualizar os contadores na interface
const atualizarContadores = () => {
    contadorTarefas.innerText = totalTarefas;
    contadorTarefasConcluidas.innerText = totalTarefasConcluidas;
};

// Função para carregar as atividades salvas do localStorage
const carregarAtividades = () => {
    const atividadesSalvas = localStorage.getItem('atividades');
    if (atividadesSalvas) {
        containerTarefas.innerHTML = atividadesSalvas;
        atualizarContadores();
        restaurarTarefasConcluidas(); // Restaura o estado de tarefas concluídas
    } else {
        totalTarefas = 0; // Caso não haja tarefas salvas
        totalTarefasConcluidas = 0; // Caso não haja tarefas salvas
        atualizarContadores(); // Atualiza os contadores
    }
};

// Função para restaurar o estado das tarefas concluídas
const restaurarTarefasConcluidas = () => {
    const tarefas = document.querySelectorAll('.dv-exterior');
    totalTarefasConcluidas = 0; // Garantir que a contagem comece zerada
    tarefas.forEach(tarefa => {
        const botaoConcluir = tarefa.querySelector('.concluir');
        const paragrafo = tarefa.querySelector('.tarefa');
        
        // Verifica se a tarefa foi marcada como concluída
        if (botaoConcluir.classList.contains('marcado')) {
            paragrafo.style.textDecoration = 'line-through';
            paragrafo.style.color = "#56ff67";
            botaoConcluir.textContent = 'Concluído';
            botaoConcluir.style.background = "#00ff37";
            totalTarefasConcluidas++; // Incrementa apenas se estiver marcada
        }

        // Adiciona os eventos de concluir e remover novamente após o carregamento
        botaoConcluir.addEventListener('click', () => concluirTarefa(paragrafo, botaoConcluir));
        const botaoRemover = tarefa.querySelector('.remover');
        botaoRemover.addEventListener('click', () => removerTarefa(tarefa));
    });
    contadorTarefasConcluidas.innerText = totalTarefasConcluidas;
};

// Função para criar os elementos HTML de uma nova tarefa
const criarElemento = (tag, classe, texto = '') => {
    const elemento = document.createElement(tag);
    elemento.classList.add(classe);
    if (texto) {
        elemento.textContent = texto;
    }
    return elemento;
};

// Função para criar o botão com a lógica de marcação de tarefa como concluída
const criarBotaoConcluir = (paragrafo) => {
    const botaoConcluir = document.createElement('button');
    botaoConcluir.classList.add('concluir');
    botaoConcluir.textContent = 'Concluir';
    botaoConcluir.addEventListener('click', () => concluirTarefa(paragrafo, botaoConcluir));
    return botaoConcluir;
};

// Função para criar o botão de remover tarefa
const criarBotaoRemover = (tarefaExterior) => {
    const botaoRemover = document.createElement('button');
    botaoRemover.classList.add('remover');
    botaoRemover.textContent = "x";
    botaoRemover.addEventListener('click', () => removerTarefa(tarefaExterior));
    return botaoRemover;
};

// Função para marcar/desmarcar uma tarefa como concluída
const concluirTarefa = (paragrafo, botaoConcluir) => {
    if (!botaoConcluir.classList.contains('marcado')) {
        marcarComoConcluida(paragrafo, botaoConcluir);
    } else {
        desmarcarComoConcluida(paragrafo, botaoConcluir);
    }
    salvarNoLocalStorage('totalTarefasConcluidas', totalTarefasConcluidas);
    salvarAtividades();
};

// Função para marcar a tarefa como concluída
const marcarComoConcluida = (paragrafo, botaoConcluir) => {
    paragrafo.style.textDecoration = 'line-through';
    paragrafo.style.color = "#56ff67";
    botaoConcluir.innerHTML = 'Concluido';
    botaoConcluir.style.background = "#00ff37";
    totalTarefasConcluidas++;
    contadorTarefasConcluidas.innerText = totalTarefasConcluidas;
    botaoConcluir.classList.add('marcado');
};

// Função para desmarcar a tarefa como concluída
const desmarcarComoConcluida = (paragrafo, botaoConcluir) => {
    paragrafo.style.textDecoration = 'none';
    paragrafo.style.color = "initial";
    botaoConcluir.textContent = 'Concluir';
    botaoConcluir.style.background = "";
    totalTarefasConcluidas--;
    contadorTarefasConcluidas.innerText = totalTarefasConcluidas;
    botaoConcluir.classList.remove('marcado');
};

// Função para remover uma tarefa
const removerTarefa = (tarefaExterior) => {
    containerTarefas.removeChild(tarefaExterior);
    totalTarefas--;
    if (totalTarefasConcluidas <= 0) {
        totalTarefasConcluidas = 0;
        contadorTarefasConcluidas.innerText = totalTarefasConcluidas;
    } else {
        totalTarefasConcluidas--;
    }
    atualizarContadores();
    salvarNoLocalStorage('totalTarefas', totalTarefas);
    salvarAtividades();
};

// Função para criar e adicionar uma nova tarefa ao DOM, funcione caramba
const adicionarNovaTarefa = () => {
    if (inputTarefa.value === '' || inputEtiqueta.value === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tarefaExterior = criarElemento('div', 'dv-exterior');
    const tarefaInterior = criarElemento('div', 'dv-interior');
    const paragrafoTarefa = criarElemento('p', 'tarefa', inputTarefa.value);
    const dvDataEtiqueta = criarElemento('div', 'dt-et');
    const etiqueta = criarElemento('p', 'etiqueta', inputEtiqueta.value);
    const dataCriacao = criarElemento('p', 'data', `Criado em: ${new Date().toLocaleDateString('pt-BR')}`);
    const botaoConcluir = criarBotaoConcluir(paragrafoTarefa);
    const botaoRemover = criarBotaoRemover(tarefaExterior);

    dvDataEtiqueta.appendChild(etiqueta);
    dvDataEtiqueta.appendChild(dataCriacao);
    tarefaInterior.appendChild(paragrafoTarefa);
    tarefaInterior.appendChild(dvDataEtiqueta);
    tarefaExterior.appendChild(tarefaInterior);
    tarefaExterior.appendChild(botaoConcluir);
    tarefaExterior.appendChild(botaoRemover);
    containerTarefas.appendChild(tarefaExterior);

    totalTarefas++;
    atualizarContadores();
    salvarNoLocalStorage('totalTarefas', totalTarefas);
    salvarAtividades();

    inputTarefa.value = '';
    inputEtiqueta.value = '';
};

// Função para salvar as atividades no localStorage
const salvarAtividades = () => {
    salvarNoLocalStorage('atividades', containerTarefas.innerHTML);
};

// Adicionar o evento de clique no botão "Adicionar"
botaoAdicionar.addEventListener('click', adicionarNovaTarefa);

// Carregar atividades salvas e contadores ao carregar a página
window.addEventListener('load', () => {
    totalTarefas = carregarDoLocalStorage('totalTarefas', 0);
    totalTarefasConcluidas = carregarDoLocalStorage('totalTarefasConcluidas', 0);
    carregarAtividades();
    atualizarContadores();
});
