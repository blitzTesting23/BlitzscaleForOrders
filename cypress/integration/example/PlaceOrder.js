describe('My First test suite ',function(){
    before(function()
    {
        cy.fixture('example').then(function(data)
        {
        this.data=data
    })
    
    })

    it.only('PlaceOrder_01_03',function(){

        cy.visit(Cypress.env('url'))
        cy.get('.rs-input').type(this.data.PhoneNo);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.rs-input').type(this.data.Password);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        cy.wait(1000)
        cy.get('a[href="/orders/place-order"]').click()
        cy.get('.Info_cursor-pointer__-pHVs > span').trigger('mouseover');
        cy.get(':nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('9003202345'); //contact number
        cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('9003994578');  //alternative contact number 
        cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear().type('selenium tester') //Customer name 
        //Select payment  mode
        cy.get('.rs-btn-toolbar div').each(($el, index, $list)=>
        {
            const paymentmode= $el.find('span').text();
            if(paymentmode.includes('COD'))
            {
                $el.find('span').click();
            }
        })
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('560067'); //pincode
        cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('123,sri nandi residency');//house number 
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('Street mine is on role no twiced'); //street/colony
        cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').type('beside Radiant lotus'); //landmark
        cy.get('.Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz').click(); //click on next 
        //select manual or cataloge order and click 
        cy.get('.rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar').each(($el, index, $list)=>
        {
            const productselection= $el.find('button').text();
            if(productselection.includes('Search products'))
            {
                $el.find('span').click();
            }
        })
   //test step
        cy.get('.SearchProductDrawer_search-bar-style__whXrC .rs-input').type('For variant');
        cy.wait(1000);
        cy.get('.SearchProductDrawer_search-bar-style__whXrC button svg').click();
        cy.wait(1000);
        cy.get('div[class="Flexbox_flex-row__aKbHb rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list)=>
        {
            const catalogueList= $el.find('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ Text_ellipsis__vYMZP"]').text();
            if(catalogueList.includes('Samsung'))
            {
               cy.log(catalogueList);
              $el.find('.rs-checkbox-checker input').click();
            }
        })
        cy.get('.rs-drawer-actions button').each(($el, index, $list)=>
        {
            const foraddbutton= $el.text();
            if(foraddbutton.includes('Add'))
            {
               cy.log(foraddbutton);
              $el.click();
              cy.wait(2000)
             
            }
        })
        cy.get('div[class="rs-picker rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-has-value"]').click();
        cy.get('div[role=listbox]').find('div[role=option]').each(($el, index, $list)=>
        {
            const selectQuantity= $el.find('span').text();
            if(selectQuantity==='03')
            {
              $el.find('span').click();
            }
        })
        cy.get('.rs-picker-toggle-placeholder p').click();
        cy.get('div[role=listbox]').find('div[role=option]').each(($el, index, $list)=>
        {
            const selectcoupon= $el.find('span').text();
            if(selectcoupon.includes('amount'))
            {
               cy.log(selectcoupon);
              $el.find('span').click();
              cy.wait(2000)
              cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-20"] input').type("1000");
              cy.wait(1000)
              cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-4"] svg').click();
              cy.wait(1000)
              cy.get('.ProductDetails_cta-style__Ktrhb > .rs-btn-toolbar > .Button_button-primary__9i0Rz').click();
              cy.wait(3000)
            }
        })
        cy.get('.Flexbox_gutter-lg__kVhG3 h4').each(($el, index, $list)=>
        {
            const courierpartner= $el.text();
            if(courierpartner.includes('SURFACE'))
            {
               cy.log(courierpartner);
              $el.click();
              cy.wait(2000)
            }
            
        })
        cy.get('.rs-flex-box-grid-end > .Button_button-primary__9i0Rz').click();
        cy.wait(1000)
        cy.get('.ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz').click();
        cy.wait(1000)
        cy.get('.rs-notification-title-with-icon').should('contain','Successfully')
        cy.get('div [class="heading2 Text_mb-lg__6jeKW"]').then(($value)=>{
            const getTSuccesspage = $value.text()
            cy.log(getTSuccesspage)
        })
       
    })

    it('PlaceOrder_01_04',function(){

        cy.visit(Cypress.env('url'))
        cy.get('.rs-input').type(this.data.PhoneNo);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.rs-input').type(this.data.Password);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        cy.wait(1000)
        cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(5) a:nth-child(6) > div.Text_body2__0FftJ.Text_subtitles-colored__s5ggG').click()
        cy.get('.Info_cursor-pointer__-pHVs > span').trigger('mouseover');
        cy.get(':nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('9003202345'); //contact number
        cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('9003994578');  //alternative contact number 
        cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear().type('selenium tester') //Customer name 
        //Select payment  mode
        cy.get('.rs-btn-toolbar div').each(($el, index, $list)=>
        {
            const paymentmode= $el.find('span').text();
            if(paymentmode.includes('Prepaid'))
            {
                $el.find('span').click();
            }
        })
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('560067'); //pincode
        cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('123,sri nandi residency');//house number 
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('Street mine is on role no twiced'); //street/colony
        cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').type('beside Radiant lotus'); //landmark
        cy.get('.Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz').click(); //click on next 
        //select manual or cataloge order and click 
        cy.get('.rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar').each(($el, index, $list)=>
        {
            const productselection= $el.find('button').text();
            if(productselection.includes('Search products'))
            {
                $el.find('span').click();
            }
        })
   //test step
        cy.get('.SearchProductDrawer_search-bar-style__whXrC .rs-input').type('For variant');
        cy.wait(1000);
        cy.get('.SearchProductDrawer_search-bar-style__whXrC button svg').click();
        cy.wait(1000);
        cy.get('div[class="Flexbox_flex-row__aKbHb rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list)=>
        {
            const catalogueList= $el.find('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ Text_ellipsis__vYMZP"]').text();
            if(catalogueList.includes('Samsung'))
            {
               cy.log(catalogueList);
              $el.find('.rs-checkbox-checker input').click();
            }
        })
        cy.get('.rs-drawer-actions button').each(($el, index, $list)=>
        {
            const foraddbutton= $el.text();
            if(foraddbutton.includes('Add'))
            {
               cy.log(foraddbutton);
              $el.click();
              cy.wait(2000)
             
            }
        })
        cy.get('div[class="rs-picker rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-has-value"]').click();
        cy.get('div[role=listbox]').find('div[role=option]').each(($el, index, $list)=>
        {
            const selectQuantity= $el.find('span').text();
            if(selectQuantity.includes('4'))
            {
               cy.log(selectQuantity);
              $el.find('span').click();
              cy.wait(2000)
            }
        })
        cy.get('.rs-picker-toggle-placeholder p').click();
        cy.get('div[role=listbox]').find('div[role=option]').each(($el, index, $list)=>
        {
            const selectcoupon= $el.find('span').text();
            if(selectcoupon.includes('amount'))
            {
               cy.log(selectcoupon);
              $el.find('span').click();
              cy.wait(2000)
              cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-20"] input').type("1000");
              cy.wait(1000)
              cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-4"] svg').click();
              cy.wait(1000)
              cy.get('.ProductDetails_cta-style__Ktrhb > .rs-btn-toolbar > .Button_button-primary__9i0Rz').click();
              cy.wait(1000)
            }
        })
        cy.get('.Flexbox_gutter-lg__kVhG3 h4').each(($el, index, $list)=>
        {
            const courierpartner= $el.text();
            if(courierpartner.includes('SURFACE'))
            {
               cy.log(courierpartner);
              $el.click();
              cy.wait(2000)
            }
           
        })
        cy.get('.rs-flex-box-grid-end > .Button_button-primary__9i0Rz').click();
        cy.wait(1000)
        cy.get('.ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz').click();
        cy.wait(1000)
        cy.get('.rs-notification-title-with-icon').should('contain', 'successfully')
        cy.get('div [class="heading2 Text_mb-lg__6jeKW"]').then(($value)=>{
            const getTSuccesspage = $value.text()
            cy.log(getTSuccesspage)
        })
       
    })

    it('PlaceOrder_01_05',function(){

        cy.visit(Cypress.env('url'))
        cy.get('.rs-input').type(this.data.PhoneNo);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.rs-input').type(this.data.Password);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        cy.wait(1000)
        cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(5) a:nth-child(6) > div.Text_body2__0FftJ.Text_subtitles-colored__s5ggG').click()
        cy.get('.Info_cursor-pointer__-pHVs > span').trigger('mouseover');
        cy.get(':nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('9007544289'); //contact number
        cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('9003994578');  //alternative contact number 
        cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear().type('selenium tester') //Customer name 
        //Select payment  mode
        cy.get('.rs-btn-toolbar div').each(($el, index, $list)=>
        {
            const paymentmode= $el.find('span').text();
            if(paymentmode.includes('COD'))
            {
                $el.find('span').click();
            }
        })
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('560067'); //pincode
        cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('123,sri nandi residency');//house number 
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('Street mine is on role no twiced'); //street/colony
        cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').type('beside Radiant lotus'); //landmark
        cy.get('.Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz').click(); //click on next 
        //select manual or cataloge order and click 
        cy.get('.rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar').each(($el, index, $list)=>
        {
            const productselection= $el.find('button').text();
            if(productselection.includes('Search products'))
            {
                $el.find('span').click();
            }
        })
   //test step
        cy.get('.SearchProductDrawer_search-bar-style__whXrC .rs-input').type('For variant');
        cy.wait(1000);
        cy.get('.SearchProductDrawer_search-bar-style__whXrC button svg').click();
        cy.wait(1000);
        cy.get('div[class="Flexbox_flex-row__aKbHb rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list)=>
        {
            const catalogueList= $el.find('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ Text_ellipsis__vYMZP"]').text();
            if(catalogueList.includes('Samsung'))
            {
               cy.log(catalogueList);
              $el.find('.rs-checkbox-checker input').click();
            }
        })
        cy.get('.rs-drawer-actions button').each(($el, index, $list)=>
        {
            const foraddbutton= $el.text();
            if(foraddbutton.includes('Add'))
            {
               cy.log(foraddbutton);
              $el.click();
              cy.wait(2000)
             
            }
        })
        cy.get('div[class="rs-picker rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-has-value"]').click();
        cy.get('div[role=listbox]').find('div[role=option]').each(($el, index, $list)=>
        {
            const selectQuantity= $el.find('span').text();
            if(selectQuantity.includes('4'))
            {
               cy.log(selectQuantity);
              $el.find('span').click();
              cy.wait(2000)
            }
        })
        cy.get('.rs-picker-toggle-placeholder p').click();
        cy.get('div[role=listbox]').find('div[role=option]').each(($el, index, $list)=>
        {
            const selectcoupon= $el.find('span').text();
            if(selectcoupon.includes('discount'))
            {
               cy.log(selectcoupon);
              $el.find('span').click();
              cy.wait(2000)
              cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-20"] input').type("1000");
              cy.wait(1000)
              cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-4"] svg').click();
              cy.wait(1000)
              cy.get('.ProductDetails_cta-style__Ktrhb > .rs-btn-toolbar > .Button_button-primary__9i0Rz').click();
              cy.wait(1000)
            }
        })
        cy.get('.Flexbox_gutter-lg__kVhG3 h4').each(($el, index, $list)=>
        {
            const courierpartner= $el.text();
            if(courierpartner.includes('SURFACE'))
            {
               cy.log(courierpartner);
              $el.click();
              cy.wait(2000)
            }
        })
        cy.get('.rs-flex-box-grid-end > .Button_button-primary__9i0Rz').click();
        cy.wait(1000)
        cy.get('.ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz').click();
        cy.wait(2000)
        //cy.get('.rs-notification-title-with-icon').should('contain', 'successfully')
        cy.get('div [class="heading2 Text_mb-lg__6jeKW"]').then(($value)=>{
            const getTSuccesspage = $value.text()
            cy.log(getTSuccesspage)
        })
       
    })
   it('PlaceOrder_01_06',function(){

        cy.visit(Cypress.env('url'))
        cy.get('.rs-input').type(this.data.PhoneNo);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.rs-input').type(this.data.Password);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Orders')) {
                $el.find('p').click();
            }
        })
        cy.wait(1000)
        cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(5) a:nth-child(6) > div.Text_body2__0FftJ.Text_subtitles-colored__s5ggG').click()
        cy.get('.Info_cursor-pointer__-pHVs > span').trigger('mouseover');
        cy.get(':nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('9003202345'); //contact number
        cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('9003994578');  //alternative contact number 
        cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear().type('selenium tester') //Customer name  
        //Select payment  mode
        cy.get('.rs-btn-toolbar div').each(($el, index, $list)=>
        {
            const paymentmode= $el.find('span').text();
            if(paymentmode.includes('Prepaid'))
            {
                $el.find('span').click();
            }
        })
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('560067'); //pincode
        cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('123,sri nandi residency');//house number 
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('Street mine is on role no twiced'); //street/colony
        cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').clear()
        cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').type('beside Radiant lotus'); //landmark
        cy.get('.Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz').click(); //click on next 
        //select manual or cataloge order and click 
        cy.get('.rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar').each(($el, index, $list)=>
        {
            const productselection= $el.find('button').text();
            if(productselection.includes('Search products'))
            {
                $el.find('span').click();
            }
        })
   //test step
        cy.get('.SearchProductDrawer_search-bar-style__whXrC .rs-input').type('For variant');
        cy.wait(1000);
        cy.get('.SearchProductDrawer_search-bar-style__whXrC button svg').click();
        cy.wait(1000);
        cy.get('div[class="Flexbox_flex-row__aKbHb rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list)=>
        {
            const catalogueList= $el.find('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ Text_ellipsis__vYMZP"]').text();
            if(catalogueList.includes('Samsung'))
            {
               cy.log(catalogueList);
              $el.find('.rs-checkbox-checker input').click();
            }
        })
        cy.get('.rs-drawer-actions button').each(($el, index, $list)=>
        {
            const foraddbutton= $el.text();
            if(foraddbutton.includes('Add'))
            {
               cy.log(foraddbutton);
              $el.click();
              cy.wait(2000)
             
            }
        })
        cy.get('div[class="rs-picker rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-has-value"]').click();
        cy.get('div[role=listbox]').find('div[role=option]').each(($el, index, $list)=>
        {
            const selectQuantity= $el.find('span').text();
            if(selectQuantity.includes('4'))
            {
               cy.log(selectQuantity);
              $el.find('span').click();
              cy.wait(2000)
            }
        })
        cy.get('.rs-picker-toggle-placeholder p').click();
        cy.get('div[role=listbox]').find('div[role=option]').each(($el, index, $list)=>
        {
            const selectcoupon= $el.find('span').text();
            if(selectcoupon.includes('discount'))
            {
               cy.log(selectcoupon);
              $el.find('span').click();
              cy.wait(2000)
              cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-20"] input').type("1000");
              cy.wait(1000)
              cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-4"] svg').click();
              cy.wait(1000)
              cy.get('.ProductDetails_cta-style__Ktrhb > .rs-btn-toolbar > .Button_button-primary__9i0Rz').click();
              cy.wait(1000)
            }
        })
        cy.get('.Flexbox_gutter-lg__kVhG3 h4').each(($el, index, $list)=>
        {
            const courierpartner= $el.text();
            if(courierpartner.includes('SURFACE'))
            {
               cy.log(courierpartner);
              $el.click();
              cy.wait(2000)
            }
         
        })
        cy.get('.rs-flex-box-grid-end > .Button_button-primary__9i0Rz').click();
        cy.wait(1000)
        cy.get('.ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz').click();
        cy.wait(1000)
        cy.get('.rs-notification-title-with-icon').should('contain', 'successfully')
        cy.get('div [class="heading2 Text_mb-lg__6jeKW"]').then(($value)=>{
            const getTSuccesspage = $value.text()
            cy.log(getTSuccesspage)
        })
       
    })

})
