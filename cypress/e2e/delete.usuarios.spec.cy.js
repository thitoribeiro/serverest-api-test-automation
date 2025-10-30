// @negative @positive
// Especificação única: exclusão de usuário por ID (DELETE /usuarios/{_id}) – NEGATIVOS → POSITIVOS
// Sem custom commands: uso direto de cy.request + validação AJV inline

import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true, strict: false });

// ---- Helpers locais ----
function assertTypicalJsonHeaders(headers) {
  expect(headers).to.have.property('content-type');
  expect(headers['content-type']).to.contain('application/json');
  expect(headers).to.have.property('x-content-type-options', 'nosniff');
  expect(headers).to.have.property('x-xss-protection', '1; mode=block');
  expect(headers).to.have.property('strict-transport-security');
  expect(headers['strict-transport-security']).to.contain('max-age=15552000');
}

function validateSchema(body, schema) {
  const validate = ajv.compile(schema);
  if (!validate(body)) {
    throw new Error(`Schema validation failed:\n${JSON.stringify(validate.errors, null, 2)}
Body:\n${JSON.stringify(body, null, 2)}`);
  }
}

// Schema para resposta de sucesso (200)
const deleteUsuarioSuccessSchema = {
  "type": "object",
  "required": ["message"],
  "properties": {
    "message": { "type": "string" }
  },
  "additionalProperties": true
};

// Schema para resposta de erro (400)
const deleteUsuarioErrorSchema = {
  "type": "object",
  "required": ["message"],
  "properties": {
    "message": { "type": "string" }
  },
  "additionalProperties": true
};

describe('API /usuarios/{_id} :: EXCLUSÃO (NEGATIVOS → POSITIVOS)', () => {
  let testUsers;
  let createdUsers = [];

  before(() => {
    cy.fixture('usuarios.test.data.json').then((data) => {
      testUsers = data;
      
      // Criar usuários para obter IDs válidos para exclusão
      const usersToCreate = [
        data.admin_user,
        data.regular_user,
        data.update_user,
        data.delete_user,
        data.case_sensitive_user,
        data.special_chars_user
      ];
      
      usersToCreate.forEach(userData => {
        cy.request({
          method: 'POST',
          url: '/usuarios',
          body: userData,
          failOnStatusCode: false
        }).then((res) => {
          if (res.status === 201) {
            createdUsers.push({
              ...userData,
              _id: res.body._id
            });
            cy.log(`✅ Usuário criado para exclusão: ${userData.nome} - ID: ${res.body._id}`);
          }
        });
      });
    });
  });

  //
  // =========================
  // NEGATIVOS
  // =========================
  //

  it('CT-001 — [200] _id inexistente (string aleatória) @negative', () => {
    // Arrange
    const idInexistente = 'ZZZnaoExiste123';
    const url = `/usuarios/${encodeURIComponent(idInexistente)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-001 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      cy.log(`CT-001 - Response body: ${JSON.stringify(res.body)}`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Nenhum registro excluído');
      validateSchema(res.body, deleteUsuarioErrorSchema);
    });
  });

  it('CT-002 — [200] _id numérico-like inexistente @negative', () => {
    // Arrange
    const idNumerico = '123456789';
    const url = `/usuarios/${encodeURIComponent(idNumerico)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-002 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Nenhum registro excluído');
      validateSchema(res.body, deleteUsuarioErrorSchema);
    });
  });

  it('CT-003 — [200] _id com caracteres especiais @negative', () => {
    // Arrange
    const idEspecial = 'id@#$%^&*()';
    const url = `/usuarios/${encodeURIComponent(idEspecial)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-003 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Nenhum registro excluído');
      validateSchema(res.body, deleteUsuarioErrorSchema);
    });
  });

  it('CT-004 — [200] _id com espaços (trim não aplicado) @negative', () => {
    // Arrange
    const idComEspacos = ' id com espacos ';
    const url = `/usuarios/${encodeURIComponent(idComEspacos)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-004 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Nenhum registro excluído');
      validateSchema(res.body, deleteUsuarioErrorSchema);
    });
  });

  it('CT-005 — [200] _id muito longo @negative', () => {
    // Arrange
    const idLongo = 'a'.repeat(1000);
    const url = `/usuarios/${encodeURIComponent(idLongo)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-005 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Nenhum registro excluído');
      validateSchema(res.body, deleteUsuarioErrorSchema);
    });
  });

  //
  // =========================
  // POSITIVOS
  // =========================
  //

  it('CT-006 — [200] Exclusão bem-sucedida de usuário válido @positive', () => {
    // Arrange
    const userToDelete = createdUsers.find(user => user.nome === 'Usuario Para Deletar');
    if (!userToDelete) {
      cy.log('sem usuário para deletar criado');
      return;
    }
    
    const url = `/usuarios/${encodeURIComponent(userToDelete._id)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-006 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      cy.log(`CT-006 - Usuário excluído: ${userToDelete.nome} (${userToDelete.email})`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Registro excluído com sucesso');
      validateSchema(res.body, deleteUsuarioSuccessSchema);
    });
  });

  it('CT-007 — [200] Exclusão de usuário administrador @positive', () => {
    // Arrange
    const adminUser = createdUsers.find(user => user.administrador === 'true');
    if (!adminUser) {
      cy.log('sem admin criado');
      return;
    }
    
    const url = `/usuarios/${encodeURIComponent(adminUser._id)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-007 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      cy.log(`CT-007 - Admin excluído: ${adminUser.nome} (${adminUser.email})`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Registro excluído com sucesso');
      validateSchema(res.body, deleteUsuarioSuccessSchema);
    });
  });

  it('CT-008 — [200] Exclusão de usuário não-administrador @positive', () => {
    // Arrange
    const regularUser = createdUsers.find(user => user.administrador === 'false');
    if (!regularUser) {
      cy.log('sem usuário regular criado');
      return;
    }
    
    const url = `/usuarios/${encodeURIComponent(regularUser._id)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-008 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      cy.log(`CT-008 - Usuário excluído: ${regularUser.nome} (${regularUser.email})`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Registro excluído com sucesso');
      validateSchema(res.body, deleteUsuarioSuccessSchema);
    });
  });

  it('CT-009 — [200] Tentativa de exclusão de usuário já excluído @negative', () => {
    // Arrange
    const userToDelete = createdUsers.find(user => user.nome === 'Usuario Para Atualizar');
    if (!userToDelete) {
      cy.log('sem usuário para atualizar criado');
      return;
    }
    
    const url = `/usuarios/${encodeURIComponent(userToDelete._id)}`;

    // Act - Primeira exclusão
    cy.request({ method: 'DELETE', url }).then((firstRes) => {
      cy.log(`CT-009 - Primeira exclusão: ${firstRes.status}`);
      
      // Segunda tentativa de exclusão (deve retornar "Nenhum registro excluído")
      cy.request({ method: 'DELETE', url }).then((res) => {
        // Assert
        cy.log(`CT-009 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
        cy.log(`CT-009 - Segunda tentativa de exclusão: ${res.status}`);
        expect(res.status).to.eq(200);
        assertTypicalJsonHeaders(res.headers);
        expect(res.body.message).to.eq('Nenhum registro excluído');
        validateSchema(res.body, deleteUsuarioErrorSchema);
      });
    });
  });

  it('CT-010 — [200] Exclusão com _id válido e encode no path @positive', () => {
    // Arrange
    const userToDelete = createdUsers.find(user => user.nome === 'Usuário com Acentuação & Símbolos');
    if (!userToDelete) {
      cy.log('sem usuário especial criado');
      return;
    }
    
    const url = `/usuarios/${encodeURIComponent(userToDelete._id)}`;

    // Act
    cy.request({ method: 'DELETE', url }).then((res) => {
      // Assert
      cy.log(`CT-010 - URL: ${Cypress.config('baseUrl')}${url} | Status: ${res.status}`);
      cy.log(`CT-010 - Usuário especial excluído: ${userToDelete.nome} (${userToDelete.email})`);
      expect(res.status).to.eq(200);
      assertTypicalJsonHeaders(res.headers);
      expect(res.body.message).to.eq('Registro excluído com sucesso');
      validateSchema(res.body, deleteUsuarioSuccessSchema);
    });
  });
});
