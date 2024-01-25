const { defineConfig } = require("cypress")
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout:10000,
})
module.exports = defineConfig({
  projectId: 'k5ztu5',
  retries: {
    runMode: 1,
    },
  env: {
          url:"http://v2.nushop-dashboard.kaip.in/",
          website:"http://nitintesting.nushop.kaip.in/"
  },
  reporter :'cypress-mochawesome-reporter',   //for  generating the HTML reports  
  e2e: {
    setupNodeEvents(on,config) {
      on('task', {downloadFile})
      // implement node event listeners here
      this.screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on);   //for reports

    },
    specPattern: 'cypress/integration/example/*.js'
  },
});
