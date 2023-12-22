const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'k5ztu5',
  retries: {
    runMode: 1,
    },
  env: {
          url:"http://v2.nushop-dashboard.kaip.in/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/example/*.js'
  },
});
