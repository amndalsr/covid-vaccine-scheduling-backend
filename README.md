# Backend Agendando Vacina 

Este repositório contém o backend do sistema de agendamento de vacinação para COVID-19. O backend foi construído usando Node.js e Express.js e fornece uma API para criar, ler, atualizar e deletar agendamentos de vacinação.

## 🔨 Funcionalidades do projeto

- **Criar Agendamento**: Permite criar novos agendamentos de vacinação.
- **Listar Agendamentos**: Recupera todos os agendamentos, agrupados por data e hora.
- **Atualizar Status do Agendamento**: Permite atualizar o status de um agendamento para indicar se foi concluído.
- **Deletar Agendamento**: Permite deletar agendamentos por ID.

## 🚀 Tecnologias utilizadas

- `JavaScript` - Linguagem de programação principal 
- `Node.js` - Runtime
- `Express.js` - Framework
- `Jest` - Para testes
- `Supertest` - Para testes de integração
- `body-parser` - Para parsing do corpo das requisições
- `cors` - Para permitir requisições de diferentes origens
- `fs` - Para operações de leitura e escrita em arquivos

## 🛠️ Abrir e rodar o projeto

1. Certifique-se de ter o Node.js instalado em sua máquina.

2. Clone o repositório de:
    ```sh
    git clone https://github.com/amndalsr/covid-vaccine-scheduling-backend.git
    ```

3. Navegue até o diretório do projeto:
    ```sh
    cd covid-vaccine-scheduling-backend
    ```

4. Instale as dependências:
    ```sh
    npm install
    ```
    
5. Executando a aplicação:
    ```sh
    node index.js
    ```
    
- O servidor estará rodando na porta '5000' ou na porta especificada na variável de ambiente 'PORT'.


## 🌎 Rotas da API
- GET `/api/appointments`: Recupera todos os agendamentos, agrupados por data e hora;
- POST `/api/appointments`: Cria um novo agendamento de vacinação;
- PUT `/api/appointments/:id`: Atualiza o status de um agendamento para indicar se foi concluído;
- DELETE `/api/appointments/:id`: Deleta um agendamento por ID;

## 🛠️ Testes

- Para rodar os testes unitários e de integração, use o comando:
  
    ```sh
    npm run test
    ```
