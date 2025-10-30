# 🚀 ServeRest API Test Automation

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Cypress](https://img.shields.io/badge/Cypress-13.6.3-blue.svg)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESM-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

Projeto de automação de testes de API para o [ServeRest](https://serverest.dev) utilizando Cypress, seguindo as melhores práticas de engenharia de qualidade de software.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Ferramentas e Tecnologias](#-ferramentas-e-tecnologias)
- [Arquitetura e Estrutura](#-arquitetura-e-estrutura)
- [Melhores Práticas Implementadas](#-melhores-práticas-implementadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando os Testes](#-executando-os-testes)
- [Estrutura dos Testes](#-estrutura-dos-testes)
- [Relatórios](#-relatórios)
- [Padrões de Código](#-padrões-de-código)
- [Exemplos de Uso](#-exemplos-de-uso)

---

## 🎯 Sobre o Projeto

Este projeto implementa uma suíte completa de testes automatizados para a API REST do ServeRest, focando em:

- ✅ **Cobertura de endpoints**: POST, GET, GET by ID, DELETE para `/usuarios`
- ✅ **Testes negativos e positivos**: Validação de casos de erro e sucesso
- ✅ **Validação de contratos**: Schemas JSON validados com AJV
- ✅ **Validação de headers**: Verificação de segurança e qualidade
- ✅ **Isolamento de dados**: Fixtures e setup automatizado
- ✅ **Relatórios detalhados**: Allure Reports para análise e rastreabilidade

---

## 🎯 Objetivos

### Principais

1. **Qualidade e Confiabilidade**: Garantir que a API funcione conforme esperado através de testes automatizados
2. **Validação de Contrato**: Verificar que as respostas da API seguem os contratos definidos (schemas)
3. **Cobertura de Cenários**: Testar tanto casos de sucesso quanto casos de erro (negativos)
4. **Manutenibilidade**: Código limpo, organizado e fácil de manter
5. **Rastreabilidade**: Relatórios detalhados para análise de resultados

### Técnicos

- Implementar padrão **AAA** (Arrange-Act-Assert) em todos os testes
- Centralizar helpers e funções reutilizáveis
- Eliminar duplicação de código (princípio DRY)
- Garantir execução rápida e estável dos testes
- Facilitar onboarding de novos membros do time

---

## 🛠 Ferramentas e Tecnologias

### Core

| Ferramenta | Versão | Propósito |
|------------|--------|-----------|
| [Node.js](https://nodejs.org/) | ≥18 | Runtime JavaScript |
| [Cypress](https://www.cypress.io/) | 13.6.3 | Framework de automação de testes E2E |
| [JavaScript (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) | ES6+ | Linguagem de programação |
| [AJV](https://ajv.js.org/) | 8.12.0 | Validação de schemas JSON |

### Relatórios e Plugins

| Ferramenta | Versão | Propósito |
|------------|--------|-----------|
| [Allure Report](https://docs.qameta.io/allure/) | 2.34.1 | Geração de relatórios detalhados |
| [@shelex/cypress-allure-plugin](https://github.com/Shelex/cypress-allure-plugin) | 2.41.2 | Integração Allure com Cypress |
| [dotenv](https://www.npmjs.com/package/dotenv) | - | Gerenciamento de variáveis de ambiente |

### Utilitários

| Ferramenta | Versão | Propósito |
|------------|--------|-----------|
| [rimraf](https://www.npmjs.com/package/rimraf) | 6.0.1 | Limpeza de diretórios (cross-platform) |

---

## 📁 Arquitetura e Estrutura

### Estrutura de Diretórios

```
serverest-api-e2e-test-automation/
│
├── cypress/                          # Diretório principal do Cypress
│   ├── e2e/                         # Testes end-to-end
│   │   ├── 1-post.usuarios.spec.cy.js
│   │   ├── 2-get.usuarios.spec.cy.js
│   │   ├── 3-get.usuario.byid.spec.cy.js
│   │   └── 4-delete.usuarios.spec.cy.js
│   │
│   ├── fixtures/                    # Dados de teste e schemas
│   │   ├── schema/                  # Schemas JSON Schema
│   │   │   ├── usuario.create.success.schema.json
│   │   │   └── usuario.create.emailInUse.schema.json
│   │   ├── usuarios.create.cases.json
│   │   └── usuarios.test.data.json
│   │
│   ├── support/                     # Helpers e configurações
│   │   ├── e2e.js                   # Configuração global Cypress
│   │   ├── helpers.js               # Helpers centralizados ⭐
│   │   └── setup.usuarios.js        # Setup para criação de dados
│   │
│   ├── screenshots/                 # Screenshots (quando necessário)
│   └── videos/                      # Vídeos (desabilitado)
│
├── reports/                         # Relatórios gerados
│   ├── allure-results/              # Resultados brutos do Allure
│   └── allure-report/               # Relatório HTML gerado
│
├── cypress.config.js                # Configuração do Cypress
├── package.json                     # Dependências e scripts npm
├── .env.example                     # Template de variáveis de ambiente
└── README.md                        # Este arquivo
```

### Organização dos Testes

Os testes seguem uma nomenclatura numérica para garantir ordem de execução:

- `1-post.usuarios.spec.cy.js` - Testes de criação (POST)
- `2-get.usuarios.spec.cy.js` - Testes de listagem (GET)
- `3-get.usuario.byid.spec.cy.js` - Testes de busca por ID (GET)
- `4-delete.usuarios.spec.cy.js` - Testes de exclusão (DELETE)

### Fluxo de Execução

```
1. Clean (limpa resultados anteriores)
   ↓
2. Execução dos testes (Cypress + Electron headless)
   ↓
3. Coleta de resultados (Allure)
   ↓
4. Geração do relatório HTML
   ↓
5. Abertura automática no navegador
```

---

## ✨ Melhores Práticas Implementadas

### 1. **Padrão AAA (Arrange-Act-Assert)**

Todos os testes seguem o padrão AAA para clareza e organização:

```javascript
it('CT-001 — [400] E-mail já cadastrado @negative', () => {
  // Arrange - Preparar dados
  const payload = fx.CT001_duplicate;
  
  // Act - Executar ação
  cy.request({ method: 'POST', url: '/usuarios', body: payload, failOnStatusCode: false })
    .then((res) => {
      // Assert - Validar resultado
      expect(res.status).to.eq(400);
      assertTypicalJsonHeaders(res.headers);
      validateSchema(res.body, schemaEmailInUse);
    });
});
```

### 2. **DRY (Don't Repeat Yourself)**

Helpers centralizados em `cypress/support/helpers.js`:

- ✅ `assertTypicalJsonHeaders()` - Validação de headers JSON
- ✅ `validateSchema()` - Validação de schemas com AJV
- ✅ `generateUniqueEmail()` - Geração de emails únicos

### 3. **Separação de Responsabilidades**

- **Fixtures**: Dados de teste isolados
- **Support/Helpers**: Funções reutilizáveis
- **Support/Setup**: Criação automática de dados para testes
- **Specs**: Apenas lógica de teste

### 4. **Validação de Contrato**

Validação de schemas JSON usando AJV para garantir conformidade com o contrato da API:

```javascript
validateSchema(res.body, schemaSuccess);
```

### 5. **Isolamento de Testes**

- Dados únicos usando `Date.now()` ou funções helper
- Setup/teardown controlado via hooks do Cypress
- Fixtures para dados estáticos

### 6. **Nomenclatura Descritiva**

- Testes com títulos descritivos e códigos (CT-XXX)
- Tags para organização (`@positive`, `@negative`, `@smoke`)
- Comentários claros nos blocos AAA

### 7. **Configuração Centralizada**

- Variáveis de ambiente via `.env`
- Configuração do Cypress em `cypress.config.js`
- Base URL configurável

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** ≥ 18.x ([Download](https://nodejs.org/))
- **npm** (incluído com Node.js) ou **yarn**
- **Git** ([Download](https://git-scm.com/))

### Verificar instalações

```bash
node --version  # Deve retornar v18.x ou superior
npm --version   # Deve retornar 9.x ou superior
git --version   # Qualquer versão recente
```

---

## 📥 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/thitoribeiro/serverest-api-e2e-test-automation.git
cd serverest-api-e2e-test-automation
```

### 2. Instale as dependências

```bash
npm install
```

Isso instalará todas as dependências listadas no `package.json`:

- Cypress
- AJV
- Allure plugins
- Outras dependências de desenvolvimento

### 3. Verifique a instalação

```bash
npx cypress verify
```

Você deve ver uma mensagem de sucesso confirmando que o Cypress está instalado corretamente.

---

## ⚙️ Configuração

### Variáveis de Ambiente

1. Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas configurações:

```env
# URL base da API ServeRest
CYPRESS_BASE_URL=https://serverest.dev

# Credenciais opcionais (se necessário para autenticação)
CYPRESS_USER_EMAIL=
CYPRESS_USER_PASSWORD=
```

**Nota**: O arquivo `.env` não é versionado (está no `.gitignore`) para proteger informações sensíveis.

### Configuração do Cypress

O arquivo `cypress.config.js` já está configurado com:

- ✅ Base URL configurável via ambiente
- ✅ Retries em caso de falhas transitórias
- ✅ Timeouts otimizados para APIs
- ✅ Desabilitação de vídeos (economia de recursos)
- ✅ Integração com Allure Reports

---

## 🚀 Executando os Testes

### Scripts Disponíveis

#### Executar testes individuais

Cada script executa um spec específico e **automaticamente gera e abre o relatório Allure**:

```bash
# Teste de criação de usuários (POST)
npm run test:post

# Teste de listagem de usuários (GET)
npm run test:get

# Teste de busca por ID (GET by ID)
npm run test:get:byid

# Teste de exclusão de usuários (DELETE)
npm run test:delete
```

#### Executar todos os testes em sequência

```bash
# Executa todos os specs na ordem numérica
npm run test:all
```

**Ordem de execução:**
1. POST /usuarios (14 testes)
2. GET /usuarios (23 testes)
3. GET /usuarios/{_id} (12 testes)
4. DELETE /usuarios/{_id} (5 testes)

**Total: 54 testes**

#### Abrir Cypress GUI (modo interativo)

Para debug e desenvolvimento:

```bash
npm run cy:open
```

---

## 📊 Estrutura dos Testes

### Cobertura Atual

| Endpoint | Método | Testes Positivos | Testes Negativos | Total |
|----------|--------|------------------|------------------|-------|
| `/usuarios` | POST | 2 | 12 | 14 |
| `/usuarios` | GET | 9 | 14 | 23 |
| `/usuarios/{_id}` | GET | 4 | 8 | 12 |
| `/usuarios/{_id}` | DELETE | 4 | 1 | 5 |
| **TOTAL** | - | **19** | **35** | **54** |

### Tipos de Validação

Cada teste valida:

- ✅ **Status HTTP**: Código de status esperado
- ✅ **Headers**: Headers de segurança e content-type
- ✅ **Schema JSON**: Conformidade com contrato usando AJV
- ✅ **Mensagens de erro**: Validação de mensagens de erro específicas
- ✅ **Dados**: Validação de campos obrigatórios e formatos

### Tags Utilizadas

- `@positive` - Testes de casos de sucesso
- `@negative` - Testes de casos de erro
- `@smoke` - Testes críticos para smoke testing

---

## 📈 Relatórios

### Allure Reports

Após cada execução, o relatório Allure é gerado e aberto automaticamente no navegador.

#### O que você encontra no relatório:

- 📊 **Dashboard**: Visão geral dos testes executados
- ✅ **Resultados detalhados**: Status de cada teste
- ⏱️ **Métricas de tempo**: Duração de execução
- 📝 **Logs**: Logs detalhados de cada passo
- 📸 **Evidências**: Screenshots e dados capturados
- 📉 **Tendências**: Histórico de execuções

#### Acessar relatório manualmente

Se necessário, você pode gerar ou abrir o relatório manualmente:

```bash
# Limpar resultados anteriores
npm run allure:clean

# Gerar relatório
npm run allure:generate

# Abrir relatório no navegador
npm run allure:open
```

**Localização**: `reports/allure-report/index.html`

---

## 📝 Padrões de Código

### Convenções de Nomenclatura

- **Arquivos de teste**: `{numero}-{acao}.{recurso}.spec.cy.js`
- **Funções helper**: `camelCase` (ex: `assertTypicalJsonHeaders`)
- **Constantes**: `camelCase` ou `UPPER_SNAKE_CASE`
- **Variáveis**: `camelCase`

### Estrutura de um Teste

```javascript
// 1. Imports
import { assertTypicalJsonHeaders, validateSchema } from '../support/helpers.js';

// 2. Setup do describe
describe('API /usuarios :: CRIAÇÃO', () => {
  let fx; // Fixtures
  
  before(() => {
    // Carregar fixtures, schemas, etc.
  });

  // 3. Testes negativos primeiro
  it('CT-001 — [400] Caso negativo @negative', () => {
    // Arrange
    const payload = fx.CT001_data;
    
    // Act
    cy.request({ method: 'POST', url: '/usuarios', body: payload, failOnStatusCode: false })
      .then((res) => {
        // Assert
        expect(res.status).to.eq(400);
        assertTypicalJsonHeaders(res.headers);
      });
  });

  // 4. Testes positivos depois
  it('CT-014 — [201] Caso positivo @positive', () => {
    // ...
  });
});
```

---

## 💡 Exemplos de Uso

### Executando um teste específico durante desenvolvimento

```bash
# Abrir Cypress GUI
npm run cy:open

# Selecionar o spec desejado e executar em modo interativo
```

### Executando apenas testes de smoke

No Cypress GUI, você pode filtrar por tags usando:

```bash
npm run cy:open
```

E então usar o filtro de busca: `@smoke`

### Verificando resultados após execução

Após executar qualquer script de teste, o relatório Allure será aberto automaticamente. Você pode:

- Analisar testes falhados
- Ver detalhes de cada passo
- Exportar relatórios em diferentes formatos
- Compartilhar resultados com a equipe

---

## 🧪 Helpers Disponíveis

### `assertTypicalJsonHeaders(headers)`

Valida headers típicos de uma resposta JSON:

```javascript
import { assertTypicalJsonHeaders } from '../support/helpers.js';

cy.request({ method: 'GET', url: '/usuarios' })
  .then((res) => {
    assertTypicalJsonHeaders(res.headers);
    // Valida: content-type, x-content-type-options, x-xss-protection, strict-transport-security
  });
```

### `validateSchema(body, schema)`

Valida se o body da resposta está conforme o schema JSON:

```javascript
import { validateSchema } from '../support/helpers.js';

const schema = {
  type: 'object',
  required: ['message', '_id'],
  properties: {
    message: { type: 'string' },
    _id: { type: 'string' }
  }
};

cy.request({ method: 'POST', url: '/usuarios', body: payload })
  .then((res) => {
    validateSchema(res.body, schema);
  });
```

### `generateUniqueEmail(prefix)`

Gera email único com timestamp:

```javascript
import { generateUniqueEmail } from '../support/helpers.js';

const email = generateUniqueEmail('admin'); 
// Resultado: admin_1234567890@serverest.dev
```

---

## 🔧 Troubleshooting

### Problema: Testes falhando com timeout

**Solução**: Verifique se a API está acessível:

```bash
curl https://serverest.dev/status
```

### Problema: Allure não abre automaticamente

**Solução**: Abra manualmente:

```bash
npm run allure:open
```

### Problema: Erro ao instalar dependências

**Solução**: Limpe o cache e reinstale:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Recursos Adicionais

- [Documentação do Cypress](https://docs.cypress.io/)
- [Documentação do ServeRest](https://serverest.dev/)
- [Documentação do Allure](https://docs.qameta.io/allure/)
- [AJV - JSON Schema Validator](https://ajv.js.org/)

---

## 📄 Licença

Este projeto está licenciado sob a licença ISC.

---

## 👤 Autor

**Thito Ribeiro**

- GitHub: [@thitoribeiro](https://github.com/thitoribeiro)

---

## 🙏 Agradecimentos

- [ServeRest Latina](https://serverest.dev/) pela API de teste pública
- Comunidade Cypress pelo excelente framework
- Equipe Allure pelos relatórios detalhados

