import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import Filters from "../PageObjects/Filters"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
import WebsiteWebElements from "../PageObjects/website"
import ApproveRequests from "../PageObjects/ApproveReturnRequests"


describe('ReturnRequest_EE_01', function () {
    let AWB;
    let phoneNo;
    let OrderIDForReturn;
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
        cy.fixture('Customer_details').then(function(custdata){
            this.custdata=custdata
        })
       
    })
    //Capture the AWB for the order ID From tackOrders and store it 
    it('TrackOrders_01_01', function () {
       
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
            .then(() => {
                misc.trackOrders().click();
                cy.wait(1000);
            })
            .then(() => {
                Nudge.shippingDetailsHover().click();
                return cy.wait(1000);
            })
            .then(() => {
                
        filters.getSearchFilterDropDown().click()
        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
            const searchBox = $el.find('p').text();
            if (searchBox.includes('ID')) {
                $el.click();
            }
        })
        filters.getInputBoxForSearchFilter().type(this.data.TrackOrderID)
        filters.getSearchSVG().click().then(()=>{
        filters.OrderDetailsLineItem().eq(0).then(($el) => {
                       const orderID= $el.find(filters.firstGridCell).text()
                       cy.log(orderID)
                       cy.wait(2000)
                        if(orderID.includes(this.data.TrackOrderID)) {
                            AWB = $el.find(Nudge.awbField).text().split(' ')[1]
                                phoneNo=$el.find(Nudge.phoneNumberFromOrderID).text()
                                cy.log("for nested ",AWB)
                                cy.wait(2000)
                                cy.log("the phone no is ",phoneNo)                         
                        }
                    }) 
                })   
                cy.wait(1000);   
            })    
    })

    //Mark the AWB delivered By hitting the Delivered API 
    it('deliveredAPI ', function () {
        const payload = {
            data: {
                awb: AWB,
                scans: "",
                current_status: "delivered",
                latest_status: {
                    clickpost_status_code: 8,
                    timestamp: "2023-04-16T22:00:00.000Z"
                },
                clickpost_data: {
                    clickpost_status_code: 8
                },
                additional: {
                    ndr_status_code: "1",
                    ndr_status_description: "Customer Unavailable"
                }
            }
        }
        cy.request({
            method: 'POST',
            url: 'http://nushop-dashboard.kaip.in/api/update-order-state',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Server': 'nginx',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
                'ETag': 'W/"20-tj8FR1AyEiO2Z6YPDa60CyElEJU"'
               
            },
            body: payload
        }).then((response) => {        
            expect(response.status).to.equal(200); 
            cy.log(JSON.stringify(response.body));
        });
    })

    //create return from website with video media attached
    it('ReturnRequests_10_01', function () {
        const website= new WebsiteWebElements();
       let eleindex ;
           cy.visit(Cypress.env('website'))
       
           website.startShoppingBanner().click()
       
           website.naviagtionBar().each(($el, index, $list) => {
               const settings = $el.text();
               if (settings.includes('Orders')) {
                   cy.wrap($el).click();
               }
           })
           cy.wait(2000)
           website.phoneNoField().type(phoneNo).wait(1000) 
           website.confirmPhoneNumberButton().click();
           website.passwordField().each(($el, index, $list) => {
               cy.wrap($el).type('0');
           }).wait(1000);      
           website.verifyButton().click().wait(2000); 
           website.orderListings().each(($el, index, $list) => {
               cy.wrap($el).children().invoke('attr', 'href').then((references) => {
                   const hyperlink = references.toString();
                   if (hyperlink.includes(this.data.TrackOrderID)) {
                       cy.log(hyperlink);
                       eleindex = index
                       cy.log(eleindex)
                   }
               })
   
           }).then(()=>{
               cy.wait(1000);
               website.orderListings().eq(eleindex).click()
               cy.wait(1000);
               website.returnOrderCTA().click().then(() => {
                   website.returnReasonOption().eq(1).click();
               }).then(() => {
                   cy.wait(1000)
                   website.nextCTAforReason().eq(1).click();
               }).then(() => { 
                   cy.wait(1000); 
                 website.uploadMediainput().eq(0).click({force: true}).invoke('css', 'display', 'block')
                 .selectFile('C:\\Users\\Lenovo\\Downloads\\pexels-jeandaniel-francoeur-2570139.jpg',{force:true})         
                 cy.wait(1000); 
                 website.uploadMediainput().eq(1).click({force: true}).invoke('css', 'display', 'block')
                 .selectFile('C:\\Users\\Lenovo\\Downloads\\vdo.mp4',{force:true}) 
                 cy.wait(1000);
                 website.uploadMediainput().eq(2).click({force: true}).invoke('css', 'display', 'block')
                 .selectFile('C:\\Users\\Lenovo\\Downloads\\pexels-pixabay-45911.jpg',{force:true})
                 cy.wait(1000);
               }).then(()=>{
                   website.remarksInputField().type('AReas we want to type dowsnt exist in the DOM')
               }).then(()=>{
                   website.nextButtonForMediaUpload().eq(1).click()
               }).then(()=>{
                   website.radioForReturnProduct().click()
               }).then(()=>{
                   website.checkboxForconformPage().click()  
                   website.ConformButton().click()
               })
               website.finalConformButton().click()
           })     
           cy.wait(4000); 
           website.returnConfirmInfo().should('have.text','Return Requested')
           website.returnStatus().should('have.text',' Return request submitted')
           website.cancelReturnCTA().should('have.text','Cancel Return')
       }) 
})