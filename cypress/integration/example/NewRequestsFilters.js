import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import Filters from "../PageObjects/Filters"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
describe('New Requests filter check', function () {
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })

    // Verify the Return Reason filter dropdown is clickable and all the options are present and the checkbox is clickable and show the appropriate results
    //If the results are found then  capture the order ID and Log If not then log Results not found 
    it('ReturnRequests_04_01', function () {
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
        filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
            const returnreason = $el.text();
            if (returnreason.includes('Reason')) {
                cy.wait(1000)
                $el.click();
                cy.wait(1000)
            }
        })
        filters.dropdownItems().each(($el, index, $list) => {
            const reasonoption = $el.find('label').text()
            if(reasonoption.includes('Color')){
                cy.log(reasonoption)
                $el.find('span[class="rs-checkbox-wrapper"]').click()
            }

        })
        filters.clickonPlaceHolder().click()
        filters.clearAllAndApply().find('button').each(($el,index,$list) =>
        {
            if($el.text().includes('Apply'))
            {
                $el.click()
            }
        })

        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("nitin ",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length

                     if (length === 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                             const OrderID=$el.text()
                             cy.log(OrderID)
                         })
                     }
                     else
                         if (length > 1) {
                             filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                                 const OrderIDs = $el.text();
                                 cy.log(OrderIDs)
                             })
                         }
                 })               
             }
             else{
                filters.searchResultNotFound().then(($el)=>{
                 const NoorderFOund=$el.text()
                 cy.log(NoorderFOund)
                 cy.log('No results Were forund for this order ID ')
             })
                }
         })  
    })

    // Verify the "x"svg is working on the filter and on clicking clear filter&apply filter options are not visible on the UI"
    it('ReturnRequests_04_02', function () {
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
        filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
            const returnreason = $el.text();

            if (returnreason.includes('Reason')) {
                cy.wait(1000)
                $el.click();
                cy.wait(1000)
            }
        })
        filters.dropdownItems().each(($el, index, $list) => {
            const reasonoption = $el.find('label').text()
            if(reasonoption.includes('Quantity')){
                cy.log(reasonoption)
                $el.find('span[class="rs-checkbox-wrapper"]').click()
            }

        })
        filters.clickonPlaceHolder().click()
        filters.clearAllAndApply().find('button').each(($el,index,$list) =>
        {
            if($el.text().includes('Apply'))
            {
                $el.click()
            }
        })
        filters.returnReasonOption().then(($el)=> {


            if ($el.length) {
                cy.log($el.text())
                cy.log('The filter values are present as selected')
                cy.wait(1000)
            }
        })
        filters.closeSVGforReturnReason().click();
        filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
            const returnreason = $el.text();

            if (returnreason.includes('Return Reason')) {
                cy.wait(1000)
                cy.log('the filters are cleared successfully')
                cy.wait(1000)
            }
        })
    })

    // Verify the Return policy filter dropdown is clickable and all the options are present and the checkbox is clickable 
    it('ReturnRequests_04_03', function () {
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
        filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
            const returnFilter = $el.text();

            if (returnFilter.includes('Policy')) {
                cy.wait(1000)
                $el.click();
                cy.wait(1000)
            }
        })
        filters.dropdownItems().each(($el, index, $list) => {
            const returnPolicy = $el.find('label').text()
            if(returnPolicy.includes('Exchange Only within 5 days')){
                cy.log(returnPolicy)
                $el.find('span[class="rs-checkbox-wrapper"]').click()
            }

        })
        filters.clickonPlaceHolder().click()
        filters.clearAllAndApply().find('button').each(($el,index,$list) =>
        {
            if($el.text().includes('Apply'))
            {
                $el.click()
            }
        })

        filters.searchResultCard().then((cardforresults)=>{
               
           cy.log("Result ",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length

                     if (length === 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                             const OrderID=$el.text()
                             cy.log(OrderID)
                         })
                     }
                     else
                         if (length > 1) {
                             filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                                 const OrderIDs = $el.text();
                                 cy.log(OrderIDs)
                             })
                         }
                 })

             }
             else{
                filters.searchResultNotFound().then(($el)=>{
                 const NoorderFOund=$el.text()
                 cy.log(NoorderFOund)
                 cy.log('No results Were forund for this order ID ')
             })
                }
         })  
    })

    // Verify the "x"svg is working on the filter and on clicking clear filter&apply filter options are not visible on the UI"
     it('ReturnRequests_04_04', function () {
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
        filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
            const returnfilter = $el.text();

            if (returnfilter.includes('Policy')) {
                cy.wait(1000)
                $el.click();
                cy.wait(1000)
            }
        })
        filters.dropdownItems().each(($el, index, $list) => {
            const returnpolicy = $el.find('label').text()
            if(returnpolicy.includes('Exchange Only within 5 days')){
                cy.log(returnpolicy)
                $el.find('span[class="rs-checkbox-wrapper"]').click()
            }

        })
        filters.clickonPlaceHolder().click()
        filters.clearAllAndApply().find('button').each(($el,index,$list) =>
        {
            if($el.text().includes('Apply'))
            {
                $el.click()
            }
        })
        filters.returnReasonOption().then(($el)=> {


            if ($el.length) {
                cy.log($el.text())
                cy.log('The filter values are present as selected')
                cy.wait(1000)
            }
        })
        filters.closeSVGforReturnReason().click();
        filters.filterPlaceHolder().find('p').each(($el, index, $list) => {
            const returnreason = $el.text();

            if (returnreason.includes('Return Reason')) {
                cy.wait(1000)
                cy.log('the filters are cleared successfully')
                cy.wait(1000)
            }
        })
    })

    //   Verify search filter by order ID is working is displaying the valid filtered results  for New requests tab 
    it('ReturnRequests_04_05', function () {
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

        filters.getSearchFilterDropDown().click()
        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
            const searchBox = $el.find('p').text();
            if (searchBox.includes('ID')) {
                $el.click();
            }
        })
        filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
        filters.getSearchSVG().click()    

        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("The length present",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length

                     if (length === 1) {
                         filters.OrderIDFromtheOrderdetailsLineItem().then(($el)=>{
                             const OrderID=$el.text()
                             cy.log('The Order ID present on the dashboard',OrderID)
                             cy.log('THe Order ID searched ',this.data.newRequestsOrderID)
                            if(OrderID.includes(this.data.newRequestsOrderID)){
                                cy.log('The searched ID is present in the table')
                             }
                         })
                     }
                     else
                         if (length > 1) {
                             filters.OrderIDFromtheOrderdetailsLineItem().each(($el, index, $list) => {
                                 const OrderIDs = $el.text();
                                 cy.log('The Order ID present on the dashboard',OrderIDs)
                             cy.log('THe Order ID searched ',this.data.newRequestsOrderID)
                             })
                         }
                 })

             }
             else{
                filters.searchResultNotFound().then(($el)=>{
                    cy.wait(1000)

                 const NoordeFOund=$el.text()
                 cy.log(NoordeFOund)
                 cy.wait(1000)

                 cy.log('No results Were forund for this order ID ')
             })
                }
         }) 

    })

    //Verify search filter by Phone number is working is displaying the valid filtered results  for New requests tab 
    it('ReturnRequests_04_06', function () {

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

        filters.getSearchFilterDropDown().click()
        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
            const searchBox = $el.find('span').text();
            if (searchBox.includes('Customer')) {
                $el.click();
            }
        })
        filters.getInputBoxForSearchFilter().type(this.data.CustomerNumber)
        filters.getSearchSVG().click()    

        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("The length present",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length

                     if (length === 1) {
                         filters.phoneNumberAddressfieldForNR().eq(0).then(($el)=>{
                             const customerPhoneNumber=$el.text()
                             cy.log('The phone number present on the dashboard',customerPhoneNumber)
                             cy.log('The phone number searched ',this.data.CustomerNumber)
                             if(customerPhoneNumber===this.data.CustomerNumber)
                             {
                                cy.log('the phone number matched successfuly')
                             }
                         })
                     }
                    //  else
                    //      if (length > 1) {
                    //          cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ"]').each(($el, index, $list) => {
                    //              const OrderIDs = $el.text();
                    //              cy.log('The Order ID present on the dashboard',OrderIDs)
                    //          cy.log('THe Order ID searched ',this.data.newRequestsOrderID)
                    //          })
                    //      }
                 })

             }
             else{
                filters.searchResultNotFound().then(($el)=>{
                 const NoorderFOund=$el.text()
                 cy.log(NoorderFOund)
                 cy.log('No results Were forund for this order ID ')
             })
                }
         }) 

    })

    // Verify on clicking on More details option in Order details all the necessory field values are present in new requests tab 
    it('ReturnRequests_04_08', function () {
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

        filters.getSearchFilterDropDown().click()
        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
            const searchBox = $el.find('span').text();
            if (searchBox.includes('Customer')) {
                $el.click();
            }
        })
        filters.getInputBoxForSearchFilter().type(this.data.CustomerNumber)
        filters.getSearchSVG().click()    

        filters.searchResultCard().then((cardforresults)=>{   
           cy.log("The length present",cardforresults.find('p').length)
             if(cardforresults.find('p').length>0)
             {
                 filters.OrderDetailsLineItem().then(($value) => {
                     length = $value.length

                     if (length === 1) {
                         filters.phoneNumberAddressfieldForNR().eq(0).then(($el)=>{
                             const customerPhoneNumber=$el.text()
                             cy.log('The phone number present on the dashboard',customerPhoneNumber)
                             cy.log('The phone number searched ',this.data.CustomerNumber)
                             if(customerPhoneNumber===this.data.CustomerNumber)
                             {
                                cy.log('the phone number matched successfuly')
                             }
                             filters.moredetailsctaButton().click()
                             cy.wait(1000)
                             filters.contentsFromSideBarFromMoreDetails().each(($el, index, $list) => {
                                const sidebarwindow = $el.text();
                               cy.log(sidebarwindow)
                              filters.visitWebsite().then((sidebar)=>{
                                if(sidebar.find('a').length>0){
                                    cy.log('the link for the catalogue exists',sidebar.find('a').length)
                                }
                              })              
                            })    
                            })
                     }
                    //  else
                    //      if (length > 1) {
                    //          cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ"]').each(($el, index, $list) => {
                    //              const OrderIDs = $el.text();
                    //              cy.log('The Order ID present on the dashboard',OrderIDs)
                    //          cy.log('THe Order ID searched ',this.data.newRequestsOrderID)
                    //          })
                    //      }
                 })

             }
             else{
                filters.searchResultNotFound().then(($el)=>{
                 const NoorderFOund=$el.text()
                 cy.log(NoorderFOund)
                 cy.log('No results Were forund for this order ID ')
             })
                }
         }) 

    })

    //Verify Approve CTA and Reject CTA are present and clickable and on clicking the Reject button the request moves to closed tab
    it('ReturnRequests_04_09', function () {
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

       filters.getSearchFilterDropDown().click()
        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
            const searchBox = $el.find('span').text();
            if (searchBox.includes('Customer')) {
                $el.click();
            }
        })
       filters.getInputBoxForSearchFilter().type(this.data.CustomerNumber)
        filters.getSearchSVG().click()

        filters.searchResultCard().then((cardforresults) => {
            cy.log("The length present", cardforresults.find('p').length)
            if (cardforresults.find('p').length > 0) {
                filters.OrderDetailsLineItem().then(($value) => {
                    length = $value.length

                    if (length === 1) {
                        cy.log('the searched order is present on the UI')
                        filters.actionColumnCTA().each(($el, index, $list) => {
                            const ActionButtons = $el.text();
                            cy.log(ActionButtons)
                            if (ActionButtons.includes('Reject')) {
                                $el.click()
                            }
                        })

                        //the side bar window and select rejection reason 
                        filters.headerForApproveAndReject().then(($el) => {
                            const headercheck = $el.text()
                            cy.log(headercheck)
                            if (headercheck.includes('Reject Return Request')) {
                                cy.log('the reject side bar window is opened successfully')
                            }
                        })
                        filters.selectRejectionReasonPlaceholder().click();
                        filters.selectrejectionReasonDropdown().then(($el) => {
                            const rjectionReason = $el.text()
                            if (rjectionReason.includes('Convinced customer')) {
                                $el.click()
                            }
                        })
                       filters.inputForRejectionRemark().type('Enter the rejection reason for the product')
                        filters.rejectOrAcceptCTA().click()

                        //to verify the order is moved from new requests tab or no 
                        filters.getSearchFilterDropDown().click()
                       filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
                            const searchBox = $el.find('span').text();
                            if (searchBox.includes('Customer')) {
                                $el.click();
                            }
                        })
                        filters.getInputBoxForSearchFilter().type(this.data.CustomerNumber)
                        filters.getSearchSVG().click()
                        filters.searchResultCard().then((cardforresults) => {
                            cy.log("The length present", cardforresults.find('p').length)
                            if (cardforresults.find('p').length > 0) {
                                filters.NoorderFOund().then(($el) => {
                                    const NoorderFOund = $el.text()
                                    cy.log(NoorderFOund)
                                    cy.log('order is moved from new requests tab')
                                    filters.resetAllFilters().click();
                                })

                            }
                            else {
                                cy.log('the order is not rejected and is Not present in New requests tab')
                                
                            }
                        })

                    }
                })

            }
            else {
                filters.searchResultNotFound().then(($el) => {
                    const NoorderFOund = $el.text()
                    cy.log(NoorderFOund)
                    cy.log('No results Were forund for this order ID ')
                })
            }
        })





    })

})