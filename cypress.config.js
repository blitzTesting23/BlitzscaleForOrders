const { defineConfig } = require("cypress")
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({
  chromeWebSecurity: false,
})
module.exports = defineConfig({
  defaultCommandTimeout: 8000, 
  pageLoadTimeout:20000,
  projectId: 'k5ztu5',
  retries: {
    runMode: 1,
    },
  env: {
          url:"http://v2.nushop-dashboard.kaip.in/",
          website:"http://nitintesting.nushop.kaip.in/"
  },
  e2e: {
    setupNodeEvents(on,config) {
      on('task', {downloadFile})
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/example/*.js'
  },
});
