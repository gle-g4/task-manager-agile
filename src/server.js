const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Porta do servidor 
const PORT = process.env.PORT || 8080;

// Dados simulados do sistema
let tasks = [
    { id: 1, title: 'Configurar ambiente de desenvolvimento', description: 'Preparar todas as ferramentas necessárias', status: 'done', priority: 'high' },
    { id: 2, title: 'Criar API do sistema', description: 'Desenvolver endpoints para gerenciar tarefas', status: 'in-progress', priority: 'high' },
    { id: 3, title: 'Implementar interface web', description: 'Criar frontend do sistema', status: 'in-progress', priority: 'medium' },
    { id: 4, title: 'Configurar testes automatizados', description: 'Implementar suite de testes', status: 'todo', priority: 'medium' },
    { id: 5, title: 'Documentar o projeto', description: 'Criar documentação técnica', status: 'todo', priority: 'low' }
];

// Criar servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Configurar CORS para permitir requisições
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Servir arquivos estáticos
    if (pathname === '/' || pathname === '/index.html') {
        serveStaticFile(res, '../public/index.html', 'text/html');
    }
    else if (pathname === '/style.css') {
        serveStaticFile(res, '../public/style.css', 'text/css');
    }
    else if (pathname.endsWith('.js')) {
        serveStaticFile(res, `../public${pathname}`, 'application/javascript');
    }

    // API Routes - Gerenciamento de Tarefas
    else if (pathname === '/api/tasks' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    }
    else if (pathname === '/api/tasks' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const newTask = JSON.parse(body);
                newTask.id = tasks.length + 1;
                tasks.push(newTask);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newTask));
            } catch (error) {
                res.writeHead(400);
                res.end('Dados inválidos');
            }
        });
    }
    else if (pathname.startsWith('/api/tasks/') && req.method === 'PUT') {
        const taskId = parseInt(pathname.split('/')[3]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const updatedTask = JSON.parse(body);
                const taskIndex = tasks.findIndex(t => t.id === taskId);
                if (taskIndex !== -1) {
                    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(tasks[taskIndex]));
                } else {
                    res.writeHead(404);
                    res.end('Tarefa não encontrada');
                }
            } catch (error) {
                res.writeHead(400);
                res.end('Dados inválidos');
            }
        });
    }
    
    // Rota padrão - Página inicial
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <title>Task Manager - TechFlow Solutions</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            text-align: center; 
                            padding: 50px;
                            background: linear-gradient(135deg, #667eea, #764ba2);
                            color: white;
                        }
                        .container {
                            background: rgba(255,255,255,0.1);
                            padding: 30px;
                            border-radius: 15px;
                            backdrop-filter: blur(10px);
                        }
                        a {
                            color: #fff;
                            text-decoration: none;
                            background: #2c3e50;
                            padding: 10px 20px;
                            border-radius: 5px;
                            display: inline-block;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🚀 Sistema Task Manager</h1>
                        <p><strong>PORTA: ${PORT}</strong></p>
                        <p>Sistema de gerenciamento de tarefas ágeis</p>
                        <a href="/index.html">👉 Clique aqui para acessar o sistema completo</a>
                    </div>
                </body>
            </html>
        `);
    }
});

// Função para servir arquivos estáticos
function serveStaticFile(res, filePath, contentType) {
    const fullPath = path.join(__dirname, filePath);
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Arquivo não encontrado');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// Iniciar servidor
server.listen(PORT, () => {
    console.log('🚀 ====================================');
    console.log('🚀 SISTEMA TASK MANAGER - RODANDO!');
    console.log('🚀 ====================================');
    console.log('📊 Acesse: http://localhost:' + PORT);
    console.log('🎯 TechFlow Solutions - Metodologias Ágeis');
    console.log('📝 Desenvolvido por: gle-g4');
    console.log('====================================');
});

// Exportar para testes
module.exports = server;