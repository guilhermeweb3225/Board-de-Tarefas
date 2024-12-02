let input1 = document.getElementById('input-1');
let input2 = document.getElementById('input-2');
let box3 = document.getElementById('box-3');
let adicionar = document.getElementById('adicionar');
let totalTarefas = 0;
let contador = document.getElementById('contador');
let totalTarefasConcluidas = 0;
let TConcluidas = document.getElementById('concluidasTarefas');

// Função para carregar atividades do localStorage
const carregarAtividades = () => {
    const atividadesSalvas = localStorage.getItem('atividades');
    return atividadesSalvas ? atividadesSalvas : ''; // Retorna o conteúdo salvo ou vazio
};

// Função para salvar atividades no localStorage
const salvarAtividades = () => {
    localStorage.setItem('atividades', box3.innerHTML);
};

// Carregar atividades ao iniciar a página
window.addEventListener('load', () => {
    const atividadesSalvas = carregarAtividades();
    if (atividadesSalvas) {
        box3.innerHTML = atividadesSalvas;
        adicionarEventos(); // Adiciona os eventos aos elementos carregados
    }

    // Carregar os valores de contagem
    totalTarefas = localStorage.getItem('totalTarefas') ? parseInt(localStorage.getItem('totalTarefas')) : 0;
    totalTarefasConcluidas = localStorage.getItem('totalTarefasConcluidas') ? parseInt(localStorage.getItem('totalTarefasConcluidas')) : 0;

    // Atualizar os valores na interface
    contador.innerText = totalTarefas;
    TConcluidas.innerText = totalTarefasConcluidas;
});

let Deta = new Date();

adicionar.addEventListener('click', () => {
    if (input1.value === '' || input2.value === '') {
        alert('Por favor, preencha todos os campos.');
    } else {

        let dvExterior = document.createElement('div');
        dvExterior.classList.add('dv-exterior');

        let dvInterior = document.createElement('div');
        dvInterior.classList.add('dv-interior');

        let paragrafo = document.createElement('p');
        paragrafo.classList.add('tarefa');
        paragrafo.textContent = input1.value;

        let dvDataEtiqueta = document.createElement('div');
        dvDataEtiqueta.classList.add('dt-et');

        let etiqueta = document.createElement('p');
        etiqueta.classList.add('etiqueta');
        etiqueta.textContent = input2.value;

        let data = document.createElement('p');
        data.classList.add('data');
        data.textContent = 'Criado em:' + Deta.toLocaleDateString('pt-BR');

        let conclua = document.createElement('button');
        conclua.classList.add('concluir');
        conclua.textContent = 'Concluir';
        conclua.addEventListener('click', () => {
            paragrafo.style.textDecoration = 'line-through';
            paragrafo.style.color = "#56ff67";
            conclua.textContent = 'Concluído';
            conclua.style.background = "#00ff37";
            totalTarefasConcluidas++;
            TConcluidas.innerText = totalTarefasConcluidas.toString();
            localStorage.setItem('totalTarefasConcluidas', totalTarefasConcluidas); // Salvar o total de tarefas concluídas
            salvarAtividades();
        });

        let remover = document.createElement('button');
        remover.classList.add('remover');
        remover.textContent = "x";
        remover.addEventListener('click', () => {
            box3.removeChild(dvExterior);
            totalTarefas--;
            contador.innerText = totalTarefas.toString();
            localStorage.setItem('totalTarefas', totalTarefas); // Atualizar o total de tarefas
            salvarAtividades();
        });

        box3.appendChild(dvExterior);
        dvExterior.appendChild(dvInterior);
        dvExterior.appendChild(conclua);
        dvExterior.appendChild(remover);
        dvInterior.appendChild(paragrafo);
        dvInterior.appendChild(dvDataEtiqueta);
        dvDataEtiqueta.appendChild(etiqueta);
        dvDataEtiqueta.appendChild(data);

        totalTarefas++;
        contador.innerText = totalTarefas.toString();
        localStorage.setItem('totalTarefas', totalTarefas); // Salvar o total de tarefas

        input1.value = '';
        input2.value = '';

        salvarAtividades();
    }
});

// Função para adicionar eventos aos elementos criados
const adicionarEventos = () => {
    document.querySelectorAll('.concluir').forEach((btn) => {
        btn.addEventListener('click', () => {
            const paragrafo = btn.previousElementSibling;
            paragrafo.style.textDecoration = 'line-through';
            paragrafo.style.color = "#56ff67";
            btn.textContent = 'Concluído';
            btn.style.background = "#00ff37";
            totalTarefas--;
            contador.innerText = totalTarefas;
            totalTarefasConcluidas++;
            TConcluidas.innerText = totalTarefasConcluidas;
            localStorage.setItem('totalTarefas', totalTarefas); // Atualizar o total de tarefas
            localStorage.setItem('totalTarefasConcluidas', totalTarefasConcluidas); // Atualizar o total de tarefas concluídas
            salvarAtividades();
        });
    });

    document.querySelectorAll('.remover').forEach((btn) => {
        btn.addEventListener('click', () => {
            const dvExterior = btn.closest('.dv-exterior');
            box3.removeChild(dvExterior);
            totalTarefas--;
            contador.innerText = totalTarefas;
            localStorage.setItem('totalTarefas', totalTarefas); // Atualizar o total de tarefas
            salvarAtividades();
        });
    });
};
//finalizado