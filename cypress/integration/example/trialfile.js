import NudgesAndColumns from "../PageObjects/NudgesAndColumns"
import Filters from "../PageObjects/Filters"
import ApproveRequests from "../PageObjects/ApproveReturnRequests"
import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
import WebsiteWebElements from "../PageObjects/website"

describe('New Requests filter check', function () {
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
        cy.fixture('Customer_details').then(function (custdata) {
            this.custdata = custdata
        })
    })
    //Verify details and Cancel return CTAs are visible in the actions column when the status of the order is "Created",Auto Settlement ="No" and and on cancel return the return gets cancelled and is in closed tab 
    it('ReturnRequests_06_12', function () {
        const Nudge = new NudgesAndColumns();
        const filters = new Filters();
        const misc = new SidebarAndMisc();
        const approve = new ApproveRequests();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo)
        misc.submit().click()
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000)
        Nudge.getBody().then((main) => {
            cy.wait(2000);
            cy.log("dialogue box ", main.find(Nudge.dialogue).length)
            if (main.find(Nudge.dialogue).length > 0) {
                Nudge.nudgeClick().click();
                cy.wait(2000);
            }
        })
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
        Nudge.getBody().then((main) => {
            cy.wait(2000);
            cy.log("Nudge present", main.find(Nudge.floater).length)
            if (main.find(Nudge.floater).length > 0) {
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
                Nudge.getNudges().click()
                cy.wait(1000)
            }
        })
        Nudge.getinfobutton().click();
        cy.wait(1000)
        Nudge.getinfobutton().click();
        cy.wait(1000)
        misc.returnRequestSubTabs().each(($el, index, $list) => {
            const tabHeaders = $el.text();
            if (tabHeaders.includes('Ongoing')) {  
                $el.click();
            }
        })   //ongoing tab selection 
        cy.wait(1000)
        filters.getSearchFilterDropDown().click()
        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
            const searchBox = $el.find('span').text();
            if (searchBox.includes('ID')) {
                $el.click();
            }
        })    //filter to search for Order ID 
        filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
        filters.getSearchSVG().click()
        filters.searchResultCard().then((cardforresults) => {
            cy.log("The length present", cardforresults.find('p').length)
            if (cardforresults.find('p').length > 0) {
                filters.OrderDetailsLineItem().then(($value) => {
                    length = $value.length   //to verify the order ID is present or no 
                    if (length === 1) {
                        filters.OrderIDFromtheOrderdetailsLineItem().then(($el) => {
                            const OrderID = $el.text()
                            cy.log('The Order ID present on the dashboard', OrderID)
                            cy.log('The Order ID searched ', this.data.newRequestsOrderID)
                            if (OrderID.includes(this.data.newRequestsOrderID)) {
                                cy.log('The searched ID is present in the table')
                            }
                        }).then(() => {
                            approve.ongoingTabButtons().eq(0).should('contain', 'Details')
                            approve.ongoingTabButtons().eq(1).should('contain', 'Cancel Return')
                            approve.ongoingTabButtons().eq(1).click()   //click on cancel return CTA button
                            cy.wait(2000)
                        }).then(() => {
                            approve.header().should('have.text', 'Cancel Request')
                            approve.rejectionReason().eq(0).should('contain', 'Rejection Reason')
                            approve.rejectionReason().eq(1).should('contain', 'Select Rejection Reason')
                            approve.rejectionRemark().eq(0).should('contain', 'Rejection Remark(For Customers)')
                            approve.rejectionRemark().eq(1).should('contain', 'This rejection remarks will be displayed to customer on the website')
                            filters.selectRejectionReasonPlaceholder().click()
                            cy.wait(1000)
                            filters.selectrejectionReasonDropdown().eq(1).click()
                            cy.wait(1000)
                            filters.inputForRejectionRemark().type('the rejection reason for rejecting the request')
                            cy.wait(1000)
                        })
                        approve.approveButton().click()
                        cy.wait(1000)
                        ForSearchFilter().type(this.data.newRequestsOrderID)
                        cy.wait(1000)
                        filters.getSearchSVG().click()
                        cy.wait(1000)
                        filters.resultcardwithNoItems().should('not.exist')
                        cy.log('The order has moved from Ongoing requests tab  requests tab')
                        cy.wait(1000)
                        misc.tabsForReturnRequests().eq(4).click()      //click on the closed  tab      
                        cy.wait(1000)
                        filters.getSearchFilterDropDown().click()
                        filters.getFilterOptionsfromtheDropdown().each(($el, index, $list) => {
                            const searchBox = $el.find('p').text();
                            if (searchBox.includes('ID')) {
                                $el.click();
                            }
                        }).then(() => {
                            filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID) ///to enter values in search input box 
                            filters.getSearchSVG().click()
                            filters.searchResultCard().then((cardforresults) => {
                            cy.log("The length present", cardforresults.find('p').length) //verify the results are present 
                            if (cardforresults.find('p').length > 0) {
                                filters.OrderDetailsLineItem().then(($value) => {
                                     length = $value.length
                                    if (length === 1) {
                                        filters.OrderIDFromtheOrderdetailsLineItem().then(($el) => {
                                            const OrderID = $el.text()
                                            if (OrderID.includes(this.data.newRequestsOrderID)) {
                                                cy.log('The searched ID is present in the table')
                                                approve.requestActionApproved().should('contain', 'Approved')
                                                approve.failedApprovedRequestStatus().should('contain', 'Failed')
                                                approve.shippingStatusinclosedtab().should('contain', 'Cancelled')
                                                approve.detailsButtonFoeClosedTab().eq(1).should('contain', 'Details')
                                                }
                                                else {
                                                    cy.log('multiple orders are present in closed tab')
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        })
                    }
                }).then(() => {
                    misc.sidebarwidgets().trigger('mouseover');
                    cy.wait(1000)
                    misc.sidebarMenuItems().each(($el, index, $list) => {
                        const settings = $el.find('p').text();
                        if (settings.includes('Finance')) {
                            $el.find('p').click();
                        }
                    })
                }).then(() => {
                    misc.expenseLedger().click();
                    cy.wait(1000)
                    misc.expenseLedgerHover().click()
                    cy.wait(1000)
                    filters.getSearchFilterDropDown().click()
                    cy.wait(1000)
                    filters.getSearchFilterDropDown().each(($el, index, $list) => {
                        const searchBox = $el.find('p').text();
                        if (searchBox.includes('Action')) {
                            $el.click();
                        }
                    })
                    filters.getInputBoxForSearchFilter().type(this.data.newRequestsOrderID)
                    filters.getSearchSVG().click()
                    cy.wait(1000)
                    approve.returnOrderRefundOrderID().should('contain', OrderIDForReturn) //shipping charge Order ID assertion                         
                    approve.spendTypeForReturnOrderRefund().should('contain', 'Shipping Charge') //spendtype assertion for shipping charge               
                    approve.amountForReturnOrderRefund().should('contain', '-')   //amount assertion for shipping charge                           
                    approve.triggerForOrderRefund().should('contain', 'Return') //trigger state for return shipping charge 
                    app
                })
            }
            else {
                filters.searchResultNotFound().then(($el) => {
                    cy.wait(1000)
                    const NoordeFOund = $el.text()
                    cy.log(NoordeFOund)
                    cy.wait(1000)
                    cy.log('No results Were forund for this order ID ')
                })
            }
        })
    })
})