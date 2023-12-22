import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
import NudgesAndColumns from "../PageObjects/NudgesAndColumns"

describe('ColumnFields', function () {
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })
// checking -nithin
    it('ReturnRequests_03_01', function () {
        const misc=new SidebarAndMisc();
        const Nudge=new NudgesAndColumns();
        //Login
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);

        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find('div[role="dialog"]').length)
              if(main.find('div[role="dialog"]').length>0){
                cy.get('.Button_button-ghost__rieSu').click();   
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
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
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
        misc.columnHeaderForTab().find('p').then(($value) => {
            length = $value.length

            if (length === 11) {
                cy.log(length)
                cy.log('all the 11 columns are present in the header for new requests tab')
                cy.wait(1000)
            }
           else{
            cy.log ('the total number of columns expected was 11 but' +length+ 'columns are present in New requests tab ')
           }
        })
        misc.columnHeaderForTab().each(($el, index, $list) => {
            const columnfields = $el.find('p').text();
            if($el.text().includes('Date','Order Details','Customer Info','Return Reason','Media by customer','Return Policy','Customer Remarks','Customer Paid','Eligible Refund Amount','Loss','Action')){
                cy.log($el.text())  
                cy.log('column is present according to the requirement ') 
            } 
        })
    })

    it('ReturnRequests_03_02', function () {
        const misc=new SidebarAndMisc();
        const Nudge=new NudgesAndColumns();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);

        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find('div[role="dialog"]').length)
              if(main.find('div[role="dialog"]').length>0){
                cy.get('.Button_button-ghost__rieSu').click();   
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
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
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
        misc.columnHeaderForTab().find('p').then(($value) => {
            length = $value.length

            if (length ===8) {
                cy.log(length)
                cy.log('all the 8 columns are present in the header for Ongoing requests tab')
                cy.wait(1000)
            }
           else{
            cy.log ('the total number of columns expected was 11 but' +length+ 'columns are present in Ongoing  requests tab ')
           }
        })
        misc.columnHeaderForTab().each(($el, index, $list) => {
            const ColumnFieldsForOngoingTab= $el.find('p').text();
            if(ColumnFieldsForOngoingTab.includes('Requested On','Accepted On','Order Details','Customer Info','Media by customer','Return Shipping','Settlement Method','Auto Settlement','Action')){
                cy.log(ColumnFieldsForOngoingTab)  
                cy.log('Ongoing requests column is present according to the requirement') 
            } 
            else
            {
                cy.log('There is a mismatch in the requirement and the column names present on dashboard')
            }
        })
    })

     it('ReturnRequests_03_03', function () {
        const misc=new SidebarAndMisc();
        const Nudge=new NudgesAndColumns();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);

        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find('div[role="dialog"]').length)
              if(main.find('div[role="dialog"]').length>0){
                cy.get('.Button_button-ghost__rieSu').click();   
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
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
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

            if (tabHeaders.includes('Pickup')) {
                $el.click();
            }
        })
        misc.columnHeaderForTab().find('p').then(($value) => {
            length = $value.length

            if (length ===8) {
                cy.log(length)
                cy.log('all the 8 columns are present in the header for Pickup failed  requests tab')
                cy.wait(1000)
            }
           else{
            cy.log ('the total number of columns expected was 11 but' +length+ 'columns are present in Pick uP failed  requests tab ')
           }
        })
       misc.columnHeaderForTab().each(($el, index, $list) => {
            const ColumnFieldsForOngoingTab= $el.find('p').text();
            if(ColumnFieldsForOngoingTab.includes('Requested On','Accepted On','Order Details','Customer Info','Media by customer','Return Shipping','Settlement Method','Auto Settlement','Action')){
                cy.log(ColumnFieldsForOngoingTab)  
                cy.log('Pick Up failed column is present according to the requirement') 
            } 
            else
            {
                cy.log('There is a mismatch in the requirement and the column names present on dashboard')
            }
        })
    })

    it('ReturnRequests_03_04', function () {
        const misc=new SidebarAndMisc();
        const Nudge=new NudgesAndColumns();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);

        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find('div[role="dialog"]').length)
              if(main.find('div[role="dialog"]').length>0){
                cy.get('.Button_button-ghost__rieSu').click();   
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
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
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

            if (tabHeaders.includes('Settlement')) {
                $el.click();
            }
        })
       misc.columnHeaderForTab().then(($value) => {
            length = $value.length

            if (length ===8) {
                cy.log(length)
                cy.log('all the 8 columns are present in the header for Settlement pending   requests tab')
                cy.wait(1000)
            }
           else{
            cy.log ('the total number of columns expected was 11 but' +length+ 'columns are present in Settlement pending  requests tab ')
           }
        })
        misc.columnHeaderForTab().each(($el, index, $list) => {
            const ForSettlementPendingTab= $el.find('p').text();
            if(ForSettlementPendingTab.includes('Requested On','Accepted On','Order Details','Customer Info','Return Shipping','Settlement Method&Status','Auto Settlement','Action')){
                cy.log(ForSettlementPendingTab)  
                cy.log('Settlement Pending column is present according to the requirement') 
            } 
            else
            {
                cy.log('There is a mismatch in the requirement and the column names present on dashboard')
            }
        })
    })
    it('ReturnRequests_03_05', function () {

        const misc=new SidebarAndMisc();
        const Nudge=new NudgesAndColumns();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);

        Nudge.getBody().then((main)=>{   
            cy.wait(2000);
            cy.log("dialogue box ",main.find('div[role="dialog"]').length)
              if(main.find('div[role="dialog"]').length>0){
                cy.get('.Button_button-ghost__rieSu').click();   
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
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
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

            if (tabHeaders.includes('Closed')) {
                $el.click();
            }
        })
        misc.columnHeaderForTab().find('p').then(($value) => {
            length = $value.length

            if (length ===8) {
                cy.log(length)
                cy.log('all the 8 columns are present in the header for Closed requests tab')
                cy.wait(1000)
            }
           else{
            cy.log ('the total number of columns expected was 11 but' +length+ 'columns are present in closed  requests tab ')
           }
        })
        misc.columnHeaderForTab().each(($el, index, $list) => {
            const ColumnFieldsForOngoingTab= $el.find('p').text();
            if(ColumnFieldsForOngoingTab.includes('Requested On','Accepted On','Order Details','Customer Info','Return Shipping','Settlement Method&Status','Auto Settlement','Action')){
                cy.log(ColumnFieldsForOngoingTab)  
                cy.log('closed requests  column is present according to the requirement') 
            } 
            else
            {
                cy.log('There is a mismatch in the requirement and the column names present on dashboard')
            }
        })
    })
})