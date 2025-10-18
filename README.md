# Task Manager - TechFlow Solutions

## OBJETIVO DO PROJETO

Desenvolver um **sistema de gerenciamento de tarefas** baseado em metodologias ágeis para uma startup de logística, permitindo:

- Acompanhar fluxo de trabalho em tempo real
- Priorizar tarefas críticas através de sistema de prioridades
- Monitorar desempenho da equipe através de métricas visuais
- Otimizar produtividade com quadro Kanban interativo

## ESCOPO DO PROJETO

### Escopo Inicial:
- Sistema de autenticação básico
- CRUD completo de tarefas (Criar, Ler, Atualizar, Excluir)
- Quadro Kanban com 3 colunas (A Fazer, Em Progresso, Concluído)
- API RESTful para gerenciamento de dados
- Interface web responsiva e intuitiva
- Testes automatizados para garantir qualidade

### Mudança de Escopo (Adicionado):
- Sistema de notificações visuais para tarefas prioritárias
- Funcionalidade de Drag & Drop entre colunas
- Estatísticas em tempo real do progresso da equipe
- GitHub Actions para integração contínua

**Justificativa da Mudança:** Melhorar a experiência do usuário e produtividade através de feedback visual imediato para tarefas críticas.

## METODOLOGIA ÁGIL ADOTADA

### Kanban - Método Escolhido

**Por que Kanban?**
- Flexibilidade para adaptação a mudanças
- Visualização clara do fluxo de trabalho
- Limitação de trabalho em progresso (WIP)
- Entrega contínua de valor
- Melhoria contínua através de métricas

### Implementação no GitHub:
- Quadro Kanban com GitHub Projects
- A Fazer: Backlog de tarefas pendentes
- Em Progresso: Tarefas em desenvolvimento
- Concluído: Tarefas finalizadas e validadas

### Práticas Ágeis Aplicadas:
1. **Desenvolvimento Iterativo**: Funcionalidades entregues em ciclos curtos
2. **Feedback Contínuo**: Testes automatizados e validação constante
3. **Colaboração**: Controle de versão com Git e GitHub
4. **Transparência**: Quadro Kanban público e acessível

## TECNOLOGIAS UTILIZADAS

### Backend:
- Node.js + HTTP Module (JavaScript Runtime)
- API RESTful para operações CRUD

### Frontend:
- HTML5 + CSS3 (Interface responsiva)
- JavaScript Vanilla (Interatividade)
- Drag & Drop API (Movimento entre colunas)

### Ferramentas de Qualidade:
- Jest (Testes automatizados)
- GitHub Actions (CI/CD Pipeline)
- Git (Controle de versão)

### Metodologias:
- Kanban (Gestão de projetos)
- GitHub Projects (Quadro ágil)
- SCRUM (Princípios de desenvolvimento)

## COMO EXECUTAR O PROJETO

### Pré-requisitos:
- Node.js 16+ instalado
- Git para controle de versão

### Passos para execução:
```bash
# 1. Clone o repositório
git clone https://github.com/gle-g4/task-manager-agile.git

# 2. Acesse a pasta do projeto
cd task-manager-agile

# 3. Execute o servidor
node src/server.js

# 4. Acesse no navegador
http://localhost:3001
