import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
import Filters from "../PageObjects/Filters"
import cypress from "cypress"
 const neatCSV = require('neat-csv')
describe('My First test suite ',function(){
    before(function()
    {
        cy.fixture('example').then(function(data)
        {
        this.data=data
    })
    })
    //Verify we are able to download the CSV from New Requests tab and compare the values from CSV with the values present on dashboard
    it('ReturnRequests_02_01',function(){
        const Nudge=new NudgesAndColumns();
        const misc=new SidebarAndMisc();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo)
        misc.submit().click()
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000)
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
               Nudge.nudgeClick().click();   
                cy.wait(2000);
            }})
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();
    
            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        misc.returnRequests().click();
    cy.wait(1000)

        //to handle the nudges 
    Nudge.getBody().then((main)=>{   
        cy.wait(2000);
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
        }})

        Nudge.getinfobutton().click();
        cy.wait(1000)
        Nudge.getinfobutton().click();
        cy.wait(1000)

           misc.downloadCSV().click()
            cy.wait(1000)
            misc.popupTextForDownload().should('contain', 'Your file is being processed')
            misc.reportsLinkFromPopup().should('exist')
            cy.wait(1000)
            misc.clickonOKButtontoDownload().click()
            cy.wait(1000)
            misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Analytics')) {
                $el.find('p').click();
            }
        })
        misc.reportsTabInAnalytics().click();
        cy.wait(1000)
        misc.reportList().eq(0).each(($el)=>{
           const returnDownloadcsv=$el.find('p').text()   
           cy.log(returnDownloadcsv)   
          if(returnDownloadcsv.includes('Requests')){
            cy.wait(1000)
            $el.find(Nudge.downloadReport).click()
            cy.wait(1000)
          }
        })
        
        cy.readFile(Cypress.config("fileServerFolder")+"\cypress\downloads\ReturnRequests1704268041878.csv")
        .then(async (text)=>
        {
            const csv= await neatCSV(text)
            cy.log(csv)
            const ordertem=csv[0]["Order ID"]
            //use assertions 
        })
      


    })

    //Verify we are able to download the CSV from Ongoing Requests tab and compare the values from CSV with the values present on dashboard
    it('ReturnRequests_02_03',function(){
        const Nudge=new NudgesAndColumns();
        const filters=new Filters();
        const misc=new SidebarAndMisc();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo)
        misc.submit().click()
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000)
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
                cy.wait(2000);
            }})
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();
    
            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        misc.returnRequests().click();
    cy.wait(1000)

        //to handle the nudges 
    Nudge.getBody().then((main)=>{   
        cy.wait(2000);
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
        }})

        Nudge.getinfobutton().click();
        cy.wait(1000)
        Nudge.getinfobutton().click();
        cy.wait(1000)

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Ongoing')) {
                $el.click();
            }
        })
            cy.wait(1000)
            misc.downloadCSV().click()
            cy.wait(1000)
            misc.popupTextForDownload().should('contain', 'Your file is being processed')
            misc.reportsLinkFromPopup().should('exist')
            cy.wait(1000)
            misc.clickonOKButtontoDownload().click()
            cy.wait(1000)
            misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Analytics')) {
                $el.find('p').click();
            }
        })
        misc.reportsTabInAnalytics().click();
        cy.wait(1000)
        misc.reportList().eq(0).each(($el)=>{
           const returnDownloadcsv=$el.find('p').text()   
           cy.log(returnDownloadcsv)   
          if(returnDownloadcsv.includes('Requests')){
            cy.wait(1000)
            $el.find(Nudge.downloadReport).click()
            cy.wait(1000)
          }
        })
    })


    //Verify we are able to download the CSV from Pickup failed Requests tab and compare the values from CSV with the values present on dashboard
    it('ReturnRequests_02_05',function(){
        const Nudge=new NudgesAndColumns();
        const misc=new SidebarAndMisc();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo)
        misc.submit().click()
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000)
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
                cy.wait(2000);
            }})
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();
    
            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        misc.returnRequests().click();
    cy.wait(1000)

        //to handle the nudges 
    Nudge.getBody().then((main)=>{   
        cy.wait(2000);
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
        }})

        Nudge.getinfobutton().click();
        cy.wait(1000)
        Nudge.getinfobutton().click();
        cy.wait(1000)

           
        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Pickup Failed')) {
                $el.click();
            }
        })
        cy.wait(1000)
        misc.downloadCSV().click()
        cy.wait(1000)
        misc.popupTextForDownload().should('contain', 'Your file is being processed')
        misc.reportsLinkFromPopup().should('exist')
        cy.wait(1000)
        misc.clickonOKButtontoDownload().click()
        cy.wait(1000)
        misc.sidebarwidgets().trigger('mouseover');
    cy.wait(1000)
   misc.sidebarMenuItems().each(($el, index, $list) => {
        const settings = $el.find('p').text();

        if (settings.includes('Analytics')) {
            $el.find('p').click();
        }
    })
    misc.reportsTabInAnalytics().click();
    cy.wait(1000)
    misc.reportList().eq(0).each(($el)=>{
       const returnDownloadcsv=$el.find('p').text()   
       cy.log(returnDownloadcsv)   
      if(returnDownloadcsv.includes('Requests')){
        cy.wait(1000)
        $el.find(Nudge.downloadReport).click()
        cy.wait(1000)
      }
    })
    })

    //Verify we are able to download the CSV from Settlement Pending Requests tab and compare the values from CSV with the values present on dashboard
    it('ReturnRequests_02_07',function(){
        const Nudge=new NudgesAndColumns();
        const misc=new SidebarAndMisc();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo)
        misc.submit().click()
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000)
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
                cy.wait(2000);
            }})
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();
    
            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        misc.returnRequests().click();
    cy.wait(1000)

        //to handle the nudges 
    Nudge.getBody().then((main)=>{   
        cy.wait(2000);
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
        }})

        Nudge.getinfobutton().click();
        cy.wait(1000)
        Nudge.getinfobutton().click();
        cy.wait(1000)

        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();

            if (tabHeaders.includes('Settlement Pending')) {
                $el.click();
            }
        })
            cy.wait(1000)
        misc.downloadCSV().click()
        cy.wait(1000)
        misc.popupTextForDownload().should('contain', 'Your file is being processed')
        misc.reportsLinkFromPopup().should('exist')
        cy.wait(1000)
        misc.clickonOKButtontoDownload().click()
        cy.wait(1000)
        misc.sidebarwidgets().trigger('mouseover');
    cy.wait(1000)
   misc.sidebarMenuItems().each(($el, index, $list) => {
        const settings = $el.find('p').text();

        if (settings.includes('Analytics')) {
            $el.find('p').click();
        }
    })
    misc.reportsTabInAnalytics().click();
    cy.wait(1000)
    misc.reportList().eq(0).each(($el)=>{
       const returnDownloadcsv=$el.find('p').text()   
       cy.log(returnDownloadcsv)   
      if(returnDownloadcsv.includes('Requests')){
        cy.wait(1000)
        $el.find(Nudge.downloadReport).click()
        cy.wait(1000)
      }
    })
    })

    //Verify we are able to download the CSV from Closed Requests tab and compare the values from CSV with the values present on dashboard
    it('ReturnRequests_02_09',function(){
        const Nudge=new NudgesAndColumns();
        const misc=new SidebarAndMisc();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo)
        misc.submit().click()
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000)
        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find(Nudge.dialogue).length)
              if(main.find(Nudge.dialogue).length>0){
                Nudge.nudgeClick().click();   
                cy.wait(2000);
            }})
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();
    
            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        misc.returnRequests().click();
    cy.wait(1000)

        //to handle the nudges 
    Nudge.getBody().then((main)=>{   
        cy.wait(2000);
        cy.log("nitin ",main.find(Nudge.floater).length)
          if(main.find(Nudge.floater).length>0){
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
            Nudge.getNudges().click()
            cy.wait(1000)
        }})

        Nudge.getinfobutton().click();
        cy.wait(1000)
        Nudge.getinfobutton().click();
        cy.wait(1000)

            misc.returnRequestSubTabs().each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Closed Requests')) {
                    $el.click();
                }
            })
            cy.wait(1000)
            misc.downloadCSV().click()
            cy.wait(1000)
            misc.popupTextForDownload().should('contain', 'Your file is being processed')
            misc.reportsLinkFromPopup().should('exist')
            cy.wait(1000)
            misc.clickonOKButtontoDownload().click()
            cy.wait(1000)
            misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
       misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();
    
            if (settings.includes('Analytics')) {
                $el.find('p').click();
            }
        })
        misc.reportsTabInAnalytics().click();
        cy.wait(1000)
        misc.reportList().eq(0).each(($el)=>{
           const returnDownloadcsv=$el.find('p').text()   
           cy.log(returnDownloadcsv)   
          if(returnDownloadcsv.includes('Requests')){
            cy.wait(1000)
            $el.find(Nudge.downloadReport).click()
            cy.wait(1000)
          }
        })
    })
})
