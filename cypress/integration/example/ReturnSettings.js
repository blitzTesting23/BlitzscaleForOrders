import SidebarAndMisc from "../PageObjects/SidebarAndMisc"
import Settings from "../PageObjects/SettingsReturn"

describe('ReturnSettings', function () {
    beforeEach(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })
    
    it('ReturnRequests_01_01', function () {  //keep the unboxing video mandatory field unchecked 
        const misc=new SidebarAndMisc();
        const settings=new Settings();
        cy.visit(Cypress.env('url'))
       misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Setting')) {
                $el.find('p').click();
            }
        })
        misc.returnAndExchangeSettings().click();

        settings.unboxingVideoField().find('span').then(($value) => {
            length = $value.length

            if (length === 1) {
                cy.log('Make Unboxing video mandatory is unchecked')
                cy.wait(1000)
                settings.clickOnSave().click();
                settings.toastMessage().should('contain', 'successfully')
            }
            else
                if (length >1) {
                    cy.log('Make Unboxing video mandatory is checked')
                    cy.wait(1000)
                    settings.clickOnVideMandatory().click();
                    cy.wait(1000)
                    settings.clickOnSave().click();
                    settings.toastMessage().should('contain', 'successfully')
                }
        })
        
    })

    it('ReturnRequests_01_02', function () {  //keep the unboxing video mandatory field checked 
        const misc=new SidebarAndMisc();
        const settings=new Settings();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Setting')) {
                $el.find('p').click();
            }
        })
        misc.returnAndExchangeSettings().click();

        settings.unboxingVideoField().find('span').then(($value) => {
            length = $value.length

            if (length === 1) {
                cy.log('Make Unboxing video mandatory is unchecked')
                cy.wait(1000)
                settings.clickOnVideMandatory().click();
                    cy.wait(1000)
                settings.clickOnSave().click();
                settings.toastMessage().should('contain', 'successfully')

            }
            else
                if (length >1) {
                    cy.log('Make Unboxing video mandatory is checked')
                    cy.wait(1000)
                    settings.clickOnSave().click();
                    settings.toastMessage().should('contain', 'successfully')
                }
        })
        

    })


    it('ReturnRequests_01_03', function () { //Select Delivery+COD charges  option from the return charges 
        const misc=new SidebarAndMisc();
        const settings=new Settings();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Setting')) {
                $el.find('p').click();
            }
        })
        misc.returnAndExchangeSettings().click();
        cy.wait(1000)
        settings.returnChargesDropdown().click();
        cy.wait(1000)

        settings.listbox().find('span').each(($el, index, $list) => {
            if ($el.text().includes('Delivery')) {
                $el.click();
            }
        })
        settings.clickOnSave().click()
        settings.toastMessage().should('contain', 'successfully')
    })

    it('ReturnRequests_01_04', function () {
        const misc=new SidebarAndMisc();
        const settings=new Settings();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Setting')) {
                $el.find('p').click();
            }
        })
        misc.returnAndExchangeSettings().click();
        settings.returnChargesDropdown().click()
        cy.wait(1000)
        settings.listbox().find('span').each(($el, index, $list) => {
            if ($el.text().includes('Custom')) {
                $el.click();
                cy.wait(1000)
            }
        })
        settings.returnChargeAmount().type(100)
        cy.wait(1000)
        settings.clickOnSave().click()
        settings.toastMessage().should('contain', 'successfully')
    })


    it('ReturnRequests_01_05', function () {
        const misc=new SidebarAndMisc();
        const settings=new Settings();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Setting')) {
                $el.find('p').click();
            }
        })
        misc.returnAndExchangeSettings().click();
        settings.returnChargesDropdown().click()
        cy.wait(1000)
        settings.listbox().find('span').each(($el, index, $list) => {
            if ($el.text().includes('No')) {
                $el.click();
                cy.wait(1000)
            }
        })
        settings.clickOnSave().click()
        cy.wait(1000)
        settings.toastMessage().should('contain', 'successfully')
        cy.wait(3000)
    })

    it('ReturnRequests_01_06', function () {
        const misc=new SidebarAndMisc();
        const settings=new Settings();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Setting')) {
                $el.find('p').click();
            }
        })
        misc.returnAndExchangeSettings().click();
        settings.hiddencustomcharges().then(($value) => {
            const getText = $value.find('span').text()
            cy.log(getText)
            if(getText==='Custom')
            {
                cy.log('the custom changes exist ')
               settings.refundInfotoCustomers().click();
                cy.wait(1000)      
            }
            else
            {
                cy.log('the custom changes doesnt exist')
                settings.refundInfotoCustomerstwo().click();
                cy.wait(1000)       
            }
        })
       settings.listbox().find('span').each(($el, index, $list) => {
            if ($el.text().includes('pickup is done')) {
                $el.click();
                cy.wait(1000)
            }
        })
        settings.clickOnSave().click()
        cy.wait(1000)
        settings.toastMessage().should('contain', 'successfully')
        cy.wait(3000)        
    })

    it('ReturnRequests_01_07', function () {
        const misc=new SidebarAndMisc();
        const settings=new Settings();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Setting')) {
                $el.find('p').click();
            }
        })
        misc.returnAndExchangeSettings().click();
        settings.hiddencustomcharges().then(($value) => {
            const getText = $value.find('span').text()
            cy.log(getText)
            if(getText==='Custom')
            {
                cy.log('the custom changes exist ')
                settings.refundInfotoCustomers().click();
                cy.wait(1000)      
            }
            else
            {
                cy.log('the custom changes doesnt exist')
                settings.refundInfotoCustomerstwo().click();
                cy.wait(1000)       
            }
        })
        settings.listbox().find('span').each(($el, index, $list) => {
            if ($el.text().includes('delivered and verified')) {
                $el.click();
                cy.wait(1000)
            }
        })
        settings.clickOnSave().click()
        cy.wait(1000)
        settings.toastMessage().should('contain', 'successfully')
        cy.wait(3000)        
    })

    it('ReturnRequests_01_08', function () {
        const misc=new SidebarAndMisc();
        const settings=new Settings();
        cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Setting')) {
                $el.find('p').click();
            }
        })
        misc.returnAndExchangeSettings().click();
        settings.returnFlowTypedropdown().click()
        cy.wait(1000)
        settings.areaDisabledFieldTrue().should('exist')
        cy.log('the Call for return button is disabled')
        cy.wait(1000)
        settings.submitReturnRequestOption().click()
        cy.wait(1000)
        settings.clickOnSave().click()
        cy.wait(1000)
        settings.toastMessage().should('contain', 'successfully')
        cy.wait(3000)
    })


   it('ReturnRequests_01_09', function () {
    const misc=new SidebarAndMisc();
    const settings=new Settings();
    cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
        const settings = $el.find('p').text();

        if (settings.includes('Setting')) {
            $el.find('p').click();
        }
    })
    misc.returnAndExchangeSettings().click();
    settings.returnChargesDropdown().click()
    cy.wait(1000)

    settings.listbox().find('span').each(($el, index, $list) => {
        if ($el.text().includes('Delivery')) {
            $el.click();
        }
    })
   
    cy.wait(1000)
    settings.refundInfotoCustomerstwo().click();
    cy.wait(1000)
    settings.listbox().find('span').each(($el, index, $list) => {
        if ($el.text().includes('return pickup is done')) {
            $el.click();
            cy.wait(1000)
        }
    })
   settings.clickOnSave().click()
    cy.wait(1000)
    settings.toastMessage().should('contain', 'successfully')
    cy.wait(3000)
    cy.log('Multiple setting changes are saved successfully')
})

it('ReturnRequests_01_10', function () {
    const misc=new SidebarAndMisc();
    const settings=new Settings();
    cy.visit(Cypress.env('url'))
    misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
    misc.submit().click();
    cy.wait(2000);
    misc.enterPhoneNumberAndOTP().type(this.data.Password);
    misc.submit().click();
    cy.wait(2000);
    misc.sidebarwidgets().trigger('mouseover');
    cy.wait(1000)
    misc.sidebarMenuItems().each(($el, index, $list) => {
        const settings = $el.find('p').text();

        if (settings.includes('Setting')) {
            $el.find('p').click();
        }
    })
    misc.returnAndExchangeSettings().click();
    settings.returnChargesDropdown().click()
    cy.wait(1000)
    settings.listbox().find('span').each(($el, index, $list) => {
        if ($el.text().includes('Custom')) {
            $el.click();
            cy.wait(1000)
        }
    })
    settings.returnChargeAmount().clear();
     settings.returnChargeAmount().type(100);
    cy.wait(1000)
    settings.hiddencustomcharges().then(($value) => {
        const getText = $value.find('span').text()
        cy.log(getText)
        if(getText==='Custom')
        {
            cy.log('the custom changes exist ')
            settings.refundInfotoCustomers().click();
            cy.wait(1000)      
        }
        else
        {
            cy.log('the custom changes doesnt exist')
            settings.refundInfotoCustomerstwo().click();
            cy.wait(1000)       
        }
    })
    settings.listbox().find('span').each(($el, index, $list) => {
        if ($el.text().includes('delivered and verified')) {
            $el.click();
            cy.wait(1000)
        }
    })
    settings.clickOnSave().click()
    cy.wait(1000)
    settings.toastMessage().should('contain', 'successfully')
    cy.wait(3000)
    cy.log('Multiple setting changes are saved successfully')
})

it('ReturnRequests_01_11', function () {
    const misc=new SidebarAndMisc();
    const settings=new Settings();
    cy.visit(Cypress.env('url'))
        misc.enterPhoneNumberAndOTP().type(this.data.PhoneNo);
        misc.submit().click();
        cy.wait(2000);
        misc.enterPhoneNumberAndOTP().type(this.data.Password);
        misc.submit().click();
        cy.wait(2000);
        misc.sidebarwidgets().trigger('mouseover');
        cy.wait(1000)
        misc.sidebarMenuItems().each(($el, index, $list) => {
        const settings = $el.find('p').text();

        if (settings.includes('Setting')) {
            $el.find('p').click();
        }
    })
    misc.returnAndExchangeSettings().click();
    settings.returnFlowTypedropdown().click()
    cy.wait(1000)
    settings.areaDisabledFieldTrue().should('exist')
    cy.log('the Call for return button is disabled')
    cy.wait(1000)
    
    settings.hiddencustomcharges().then(($value) => {
        const getText = $value.find('span').text()
        cy.log(getText)
        if(getText==='Custom')
        {
            cy.log('the custom changes exist ')
            settings.refundInfotoCustomers().click();
            cy.wait(1000)      
        }
        else
        {
            cy.log('the custom changes doesnt exist')
            settings.refundInfotoCustomerstwo().click();
            cy.wait(1000)       
        }
    })

    cy.wait(1000)
    settings.areaDisabledFieldTrue().should('exist')
    cy.wait(1000)
    cy.log("no auto refund options are disabled")
    cy.log('Call for return and No auto refund options are disabled')
    cy.wait(3000)
})

})

