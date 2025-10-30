import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import allureWriter from '@shelex/cypress-allure-plugin/writer';
dotenv.config(); // permite ler variáveis do .env local

export default defineConfig({
  e2e: {
    // 🔹 URL base da API ou aplicação testada
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://serverest.dev',

    // 🔹 Caminho dos testes (permite organização por pastas)
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // 🔹 Arquivo de suporte global (hooks, comandos, plugins)
    supportFile: 'cypress/support/e2e.js',

    // 🔹 Desabilita vídeos (ótimo para pipelines de API)
    video: false,

    // 🔹 Timeouts padrão — mantidos em nível profissional
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,

    // 🔹 Retries em caso de falha (útil para endpoints instáveis)
    retries: {
      runMode: 1, // em execução headless
      openMode: 0 // em modo interativo
    },

    // 🔹 Configurações de viewport (consistência)
    viewportWidth: 1280,
    viewportHeight: 720,

    // 🔹 Variáveis de ambiente customizadas
    env: {
      allure: true, // ativa Allure se estiver usando
      allureResultsPath: 'reports/allure-results',
      allureLogCypress: true,
      apiTimeout: 10000,
      defaultUserEmail: process.env.CYPRESS_USER_EMAIL,
      defaultUserPassword: process.env.CYPRESS_USER_PASSWORD
    },

    // 🔹 Eventos do Node (plugins / relatórios)
    setupNodeEvents(on, config) {
      // Allure plugin
      allureWriter(on, config);

      // Exemplo: logs customizados de requisições (opcional)
      on('task', {
        log(message) {
          console.log('LOG:', message);
          return null;
        }
      });

      return config;
    }
  },

  // 🔹 Diretórios padrão para artefatos (mantém organização)
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads'
});
