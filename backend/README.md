<h1 align="center">Lyncas Challenge Backend</h1>

<div align="center">
  <p align="center">
    <a href="#sobre-information_source">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#tecnologias-computer">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#iniciando-rocket">Iniciando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  </p>
</div>

## Sobre :information_source:

Essa é uma API que realiza cadastro de Provas e Questões.

## Tecnologias :computer:

- **NodeJS** - É um software de código aberto, multiplataforma, que executa códigos JavaScript no backend/servido.
- **Axios** - Biblioteca JavaScript utilizada para realizar e controlar requests HTTP.
- **Express** - Biblioteca JavaScript utilizada para facilitar o desenvolvimento de API's com NodeJS
- **TypeORM** - Biblioteca que abstrai a comunição com o banco de dados.
- **ESLint, Prettier** - Bibliotecas utilizadas para linting e padronização de código.

## Iniciando :rocket:

### Execute os testes

1. Execute `yarn` para instalar as dependências do projeto.
2. Execute `yarn test` para rodar todos os testes implementados.

**Obs:** Os testes ainda não foram implementados :confused:

### Execute a aplicação

### Executando na máquina: 
OBS: Será necessario ter instalado na maquina [NodeJS](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/) e [PostgreSQL](https://www.postgresql.org/)

1. Execute `cp .env.example .env` para realizar definir .env
2. Dentro do arquivo .env você deverá configurar as variavéis de acordo com seu ambiente.
3. Execute `yarn` para instalar as dependências do projeto.
4. Execute `yarn typeorm migration:run` para realizar a população do banco de dados.
2. Execute `yarn dev:server` para subir a aplicação (Desenvolvimento).
3. O projeto será executado no link [http://localhost:3333](http://localhost:3333).



