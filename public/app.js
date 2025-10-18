// Sistema Frontend - TechFlow Solutions Task Manager

let tasks = [];

// Carregar tarefas ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    carregarTarefas();
});

async function carregarTarefas() {
    try {
        const response = await fetch('/api/tasks');
        tasks = await response.json();
        renderizarTarefas();
        atualizarEstatisticas();
    } catch (error) {
        console.log('Usando dados locais...');
        // Dados de exemplo se a API não estiver disponível
        tasks = [
            { id: 1, title: 'Configurar ambiente de desenvolvimento', description: 'Preparar todas as ferramentas necessárias', status: 'done', priority: 'high' },
            { id: 2, title: 'Criar API do sistema', description: 'Desenvolver endpoints para gerenciar tarefas', status: 'in-progress', priority: 'high' },
            { id: 3, title: 'Implementar interface web', description: 'Criar frontend do sistema', status: 'in-progress', priority: 'medium' },
            { id: 4, title: 'Configurar testes automatizados', description: 'Implementar suite de testes', status: 'todo', priority: 'medium' },
            { id: 5, title: 'Documentar o projeto', description: 'Criar documentação técnica', status: 'todo', priority: 'low' }
        ];
        renderizarTarefas();
        atualizarEstatisticas();
    }
}

function renderizarTarefas() {
    const containers = {
        'todo': document.getElementById('todo-tasks'),
        'in-progress': document.getElementById('progress-tasks'),
        'done': document.getElementById('done-tasks')
    };

    // Limpar containers
    Object.values(containers).forEach(container => container.innerHTML = '');

    // Adicionar tarefas
    tasks.forEach(task => {
        const taskElement = criarElementoTarefa(task);
        containers[task.status].appendChild(taskElement);
    });

    atualizarContadores();
}

function criarElementoTarefa(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.priority}`;
    taskDiv.draggable = true;
    taskDiv.dataset.taskId = task.id;

    taskDiv.innerHTML = `
        <div class="task-header">
            <div class="task-title">${task.title}</div>
            <span class="task-priority priority-${task.priority}">
                ${task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
            </span>
        </div>
        <div class="task-description">${task.description}</div>
        <div class="task-actions">
            <button onclick="moverTarefa(${task.id}, 'todo')" title="Mover para A Fazer">⏳</button>
            <button onclick="moverTarefa(${task.id}, 'in-progress')" title="Mover para Em Progresso">🔄</button>
            <button onclick="moverTarefa(${task.id}, 'done')" title="Mover para Concluído">✅</button>
            <button onclick="editarTarefa(${task.id})" title="Editar Tarefa">✏️</button>
            <button onclick="excluirTarefa(${task.id})" title="Excluir Tarefa">🗑️</button>
        </div>
    `;

    // Configurar drag and drop
    taskDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.id);
    });

    return taskDiv;
}

// Configurar zonas de drop
document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
    });

    column.addEventListener('dragleave', () => {
        column.style.backgroundColor = '';
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.style.backgroundColor = '';
        const taskId = parseInt(e.dataTransfer.getData('text/plain'));
        const newStatus = column.classList.contains('todo-column') ? 'todo' :
                         column.classList.contains('progress-column') ? 'in-progress' : 'done';
        moverTarefa(taskId, newStatus);
    });
});

async function moverTarefa(taskId, newStatus) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = newStatus;
        
        try {
            await fetch(`/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
        } catch (error) {
            console.log('API não disponível - usando dados locais');
        }
        
        renderizarTarefas();
        atualizarEstatisticas();
    }
}

async function adicionarTarefa() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const priority = document.getElementById('task-priority').value;

    if (!title.trim()) {
        alert('Por favor, digite um título para a tarefa!');
        return;
    }

    const newTask = {
        title: title,
        description: description,
        priority: priority,
        status: 'todo'
    };

    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        const createdTask = await response.json();
        tasks.push(createdTask);
    } catch (error) {
        console.log('API não disponível - adicionando localmente');
        newTask.id = tasks.length + 1;
        tasks.push(newTask);
    }

    // Limpar formulário
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-priority').value = 'low';

    renderizarTarefas();
    atualizarEstatisticas();
    
    alert('Tarefa adicionada com sucesso! 🎉');
}

function editarTarefa(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newTitle = prompt('Editar título:', task.title);
        if (newTitle !== null) {
            task.title = newTitle;
            const newDesc = prompt('Editar descrição:', task.description);
            if (newDesc !== null) {
                task.description = newDesc;
                renderizarTarefas();
                alert('Tarefa atualizada! ✏️');
            }
        }
    }
}

function excluirTarefa(taskId) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        renderizarTarefas();
        atualizarEstatisticas();
        alert('Tarefa excluída! 🗑️');
    }
}

function atualizarEstatisticas() {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const progress = tasks.filter(t => t.status === 'in-progress').length;

    document.getElementById('total-tasks').textContent = total;
    document.getElementById('done-tasks').textContent = done;
    document.getElementById('progress-tasks').textContent = progress;
}

function atualizarContadores() {
    const todoCount = tasks.filter(t => t.status === 'todo').length;
    const progressCount = tasks.filter(t => t.status === 'in-progress').length;
    const doneCount = tasks.filter(t => t.status === 'done').length;

    document.getElementById('todo-count').textContent = todoCount;
    document.getElementById('progress-count').textContent = progressCount;
    document.getElementById('done-count').textContent = doneCount;
}

// Permitir adicionar tarefa com Enter
document.getElementById('task-title').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});