// Setup para criar usuários de teste antes dos testes GET, PUT e DELETE
// Este arquivo deve ser importado nos specs que precisam dos usuários criados

import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true, strict: false });

// Schema para resposta de sucesso do POST /usuarios
const postUsuarioSuccessSchema = {
  "type": "object",
  "required": ["message", "_id"],
  "properties": {
    "message": { "type": "string" },
    "_id": { "type": "string" }
  },
  "additionalProperties": true
};

// Helper para validar schema
function validateSchema(body, schema) {
  const validate = ajv.compile(schema);
  if (!validate(body)) {
    throw new Error(`Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}`);
  }
}

// Helper para criar usuário
export function createTestUser(userData) {
  cy.request({
    method: 'POST',
    url: '/usuarios',
    body: userData,
    failOnStatusCode: false
  }).then((res) => {
    if (res.status === 201) {
      cy.log(`✅ Usuário criado: ${userData.nome} (${userData.email}) - ID: ${res.body._id}`);
      validateSchema(res.body, postUsuarioSuccessSchema);
    } else {
      cy.log(`❌ Falha ao criar usuário: ${userData.nome} (${userData.email}) - Status: ${res.status}`);
    }
  });
}

// Helper para criar múltiplos usuários
export function createMultipleTestUsers(usersData) {
  const createdUsers = [];
  
  usersData.forEach((userData, index) => {
    createTestUser(userData).then((result) => {
      createdUsers.push(result);
      if (index === usersData.length - 1) {
        cy.log(`📊 Resumo: ${createdUsers.filter(u => u.created).length}/${usersData.length} usuários criados com sucesso`);
      }
    });
  });
  
  return cy.wrap(createdUsers);
}

// Helper para limpar usuários criados (opcional)
export function cleanupTestUsers(userIds) {
  if (!userIds || userIds.length === 0) return;
  
  userIds.forEach(userId => {
    if (userId) {
      cy.request({
        method: 'DELETE',
        url: `/usuarios/${userId}`,
        failOnStatusCode: false
      }).then((res) => {
        if (res.status === 200) {
          cy.log(`🗑️ Usuário deletado: ${userId}`);
        }
      });
    }
  });
}
