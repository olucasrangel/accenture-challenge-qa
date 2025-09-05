---

# Desafio de QA Automation - Accenture

**Autor:** Lucas Rangel
**Data:** 05 de Setembro de 2025

Este repositório contém a solução para o Desafio de QA Automation, utilizando Cypress e Cucumber para criar uma suíte de testes integrada para API e Frontend, com foco em boas práticas de arquitetura e código limpo.

---

## **Arquitetura e Decisões de Design**

A solução foi projetada para ser robusta, escalável e de fácil manutenção, aplicando os seguintes princípios:

- **Stack Principal:** Cypress, JavaScript e Cucumber (BDD).
- **Execução Unificada:** Testes de API (`cy.request`) e UI são executados por um único framework e orquestrados por um comando (`npm run test`), atendendo ao requisito de execução contínua.
- **Testes Legíveis (BDD):** Cenários escritos em Gherkin (`.feature`) para alinhar os testes com as regras de negócio.
- **Código Organizado:** A estrutura de pastas (`/pages`, `/step_definitions`) promove a separação de responsabilidades e o uso do padrão Page Object Model.
- **Resiliência em CI/CD:** A suíte é configurada com 2 `retries` em modo `run` para lidar com instabilidades, tornando a automação mais confiável.

---

## **Como Começar**

### **Pré-requisitos**

- Git
- Node.js (v18 ou superior)

### **Instalação**

1. **Clone o repositório:**
   ```bash
   git clone <url_do_repositorio>
   cd accenture-challenge-qa
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```

### **Execução dos Testes**

Use os scripts abaixo para rodar a automação.

- **Para rodar a suíte completa (API + UI) em modo headless (sem interface):**
  ```bash
  npm run test
  ```
- **Para desenvolvimento interativo (abre a interface do Cypress):**
  ```bash
  npm run start
  ```

---

## **Escopo de Requisitos Atendidos**

### **Parte 1: Desafio de API**

**Status:** **Concluído**
**Arquivo de Teste:** `cypress/e2e/book_store_api.feature`

- [x] Criar um usuário
- [x] Gerar um token de acesso
- [x] Confirmar se o usuário está autorizado
- [x] Listar os livros disponíveis
- [x] Adicionar dois livros à coleção do usuário
- [x] Listar os detalhes do usuário com os livros escolhidos

### **Parte 2: Desafio de Frontend**

**Status:** **Concluído**

#### Requisitos Atendidos:

- [x] **Forms & Web Tables (+ Bônus)**
  - _Arquivo: `cypress/e2e/web_tables.feature`_
- [x] **Alerts & Browser Windows**
  - _Arquivo: `cypress/e2e/browser_windows.feature`_
- [x] **Progress Bar**
  - _Arquivo: `cypress/e2e/progress_bar.feature`_
- [x] **Acesso Inicial**
  - _Arquivo: `cypress/e2e/initial_access.feature`_

#### Requisitos Não Atendidos:

- [ ] **Sortables**
  - _A automação para este cenário não foi incluída no escopo final desta entrega._

---

## 🛠️ **Configuração Técnica**

### `package.json`

```json
{
  "name": "accenture-challenge-cypress",
  "version": "1.0.0",
  "description": "Accenture QA Automation Challenge",
  "scripts": {
    "test": "cypress run",
    "start": "cypress open"
  },
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^20.0.7",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.1",
    "cypress": "^13.13.0",
    "esbuild": "^0.23.0"
  }
}
```

### `cypress.config.js`

```javascript
const { defineConfig } = require('cypress');
const esbuild = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', esbuild(config));
  return config;
}

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    specPattern: '**/*.feature',
    setupNodeEvents,
  },
});
```
