# Fixtures - Dados de Teste

## Arquivos Disponíveis

### `usuarios.create.cases.json`
Dados para testes de criação (POST /usuarios) - casos negativos e positivos.

### `usuarios.test.data.json` ⭐ **NOVO**
Dados de usuários para testes de listagem, atualização e exclusão (GET, PUT, DELETE /usuarios).

## Estrutura dos Dados de Teste

### Usuários Disponíveis:

| Usuário | Email | Nome | Administrador | Uso |
|---------|-------|------|---------------|-----|
| `admin_user` | admin.teste@serverest.dev | Administrador Teste | true | Testes de filtro por admin |
| `regular_user` | usuario.regular@serverest.dev | Usuario Regular Teste | false | Testes de filtro por admin |
| `update_user` | usuario.update@serverest.dev | Usuario Para Atualizar | false | Testes de PUT |
| `delete_user` | usuario.delete@serverest.dev | Usuario Para Deletar | false | Testes de DELETE |
| `duplicate_name_user` | duplicado1@serverest.dev | Nome Duplicado | false | Testes de duplicidade |
| `duplicate_name_user2` | duplicado2@serverest.dev | Nome Duplicado | true | Testes de duplicidade |
| `special_chars_user` | especial@serverest.dev | Usuário com Acentuação & Símbolos | false | Testes de caracteres especiais |
| `long_name_user` | nome.longo@serverest.dev | Usuario com Nome Muito Longo... | false | Testes de limite |
| `filter_test_user` | filtro.teste@serverest.dev | Usuario Filtro Teste | true | Testes de filtros |
| `case_sensitive_user` | joao.silva@serverest.dev | João da Silva QA | false | Testes de case sensitivity |
| `substring_test_user` | maria.joaquina@serverest.dev | Maria Joaquina Tester | false | Testes de substring |
| `combination_test_user` | combinacao.teste@serverest.dev | Usuario Combinacao Teste | true | Testes de combinação |

## Como Usar

### 1. Importar a fixture:
```javascript
cy.fixture('usuarios.test.data.json').then((data) => {
  const adminUser = data.admin_user;
  const regularUser = data.regular_user;
  // ... usar os dados
});
```

### 2. Usar o setup automático:
```javascript
import { createTestUser } from '../support/setup.usuarios.js';

// Criar usuário específico
createTestUser(testUsers.admin_user);

// Criar múltiplos usuários
const usersToCreate = [testUsers.admin_user, testUsers.regular_user];
usersToCreate.forEach(userData => {
  createTestUser(userData);
});
```

## Setup Automático

O arquivo `cypress/support/setup.usuarios.js` contém helpers para:

- ✅ **createTestUser()**: Criar usuário individual
- ✅ **createMultipleTestUsers()**: Criar múltiplos usuários
- ✅ **cleanupTestUsers()**: Limpar usuários criados (opcional)
- ✅ **Validação de schema**: Validação automática das respostas

## Vantagens

1. **🔄 Reutilização**: Dados consistentes entre testes
2. **📊 Organização**: Dados estruturados e documentados
3. **⚡ Performance**: Setup automático antes dos testes
4. **🎯 Flexibilidade**: Fácil adição de novos usuários
5. **🧹 Manutenção**: Centralização dos dados de teste

## Próximos Passos

- [ ] Criar testes PUT /usuarios usando estes dados
- [ ] Criar testes DELETE /usuarios usando estes dados
- [ ] Adicionar mais usuários conforme necessário
- [ ] Implementar cleanup automático após testes
