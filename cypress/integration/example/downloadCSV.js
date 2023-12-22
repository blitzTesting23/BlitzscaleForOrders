
describe('My First test suite ',function(){
    before(function()
    {
        cy.fixture('example').then(function(data)
        {
        this.data=data
    })
    })
    //Verify we are able to download the CSV from New Requests tab and compare the values from CSV with the values present on dashboard
    it.only('ReturnRequests_02_01',function(){

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
        cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(5) a:nth-child(3) > div.Text_body2__0FftJ.Text_subtitles-colored__s5ggG').click();
        cy.wait(1000)

         //to handle the nudges 
         cy.get('body').then((main)=>{   
            cy.wait(2000);
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
            }})

            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)
            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)

            cy.get('button[data-sd-event="download"]').click();
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] p').should('contain', 'Your file is being processed')
            cy.get('div[class="rs-modal-content"] p a').should('exist')
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] div button').click()
            cy.wait(1000)
            cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Analytics')) {
                $el.find('p').click();
            }
        })
        cy.get(' a[href="/analytics/reports"]').click();
        cy.wait(1000)
        cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').eq(0).each(($el)=>{
           const returnDownloadcsv=$el.find('p').text()   
           cy.log(returnDownloadcsv)   
          if(returnDownloadcsv.includes('Requests')){
            cy.wait(1000)
            $el.find('button[data-sd-event="downloadReport"]').click()
            cy.wait(1000)
          }
        })
    })
    it('ReturnRequests_02_03',function(){

        cy.visit(Cypress.env('url'))
        cy.get('.rs-input').type(9380879945);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.rs-input').type("0000");
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
        cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(5) a:nth-child(3) > div.Text_body2__0FftJ.Text_subtitles-colored__s5ggG').click();
        cy.wait(1000)

         //to handle the nudges 
         cy.get('body').then((main)=>{   
            cy.wait(2000);
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
            }})

            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)
            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)

            cy.get('div[class="NavigateTabGroup_tabgroup-container__SOWwd"] h5 span').each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Ongoing')) {
                    $el.click();
                }
            })
            cy.wait(1000)
            cy.get('button[data-sd-event="download"]').click();
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] p').should('contain', 'Your file is being processed')
            cy.get('div[class="rs-modal-content"] p a').should('exist')
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] div button').click()
            cy.wait(1000)
            cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Analytics')) {
                $el.find('p').click();
            }
        })
        cy.get(' a[href="/analytics/reports"]').click();
        cy.wait(1000)
        cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').eq(0).each(($el)=>{
           const returnDownloadcsv=$el.find('p').text()   
           cy.log(returnDownloadcsv)   
          if(returnDownloadcsv.includes('Requests')){
            cy.wait(1000)
            $el.find('button[data-sd-event="downloadReport"]').click()
            cy.wait(4000)
          }
        })
    })

    it('ReturnRequests_02_05',function(){

        cy.visit(Cypress.env('url'))
        cy.get('.rs-input').type(9380879945);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.rs-input').type("0000");
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
        cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(5) a:nth-child(3) > div.Text_body2__0FftJ.Text_subtitles-colored__s5ggG').click();
        cy.wait(1000)

         //to handle the nudges 
         cy.get('body').then((main)=>{   
            cy.wait(2000);
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)           
            }})

            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)
            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)

            cy.get('div[class="NavigateTabGroup_tabgroup-container__SOWwd"] h5 span').each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Pickup')) {
                    $el.click();
                }
            })
            cy.wait(1000)
            cy.get('button[data-sd-event="download"]').click();
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] p').should('contain', 'Your file is being processed')
            cy.get('div[class="rs-modal-content"] p a').should('exist')
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] div button').click()
            cy.wait(1000)
            cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Analytics')) {
                $el.find('p').click();
            }
        })
        cy.get(' a[href="/analytics/reports"]').click();
        cy.wait(1000)
        cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').eq(0).each(($el)=>{
           const returnDownloadcsv=$el.find('p').text()   
           cy.log(returnDownloadcsv)   
          if(returnDownloadcsv.includes('Requests')){
            cy.wait(1000)
            $el.find('button[data-sd-event="downloadReport"]').click()
            cy.wait(1000)
          }
        })
    })

    it('ReturnRequests_02_07',function(){

        cy.visit(Cypress.env('url'))
        cy.get('.rs-input').type(9380879945);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.rs-input').type("0000");
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
        cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(5) a:nth-child(3) > div.Text_body2__0FftJ.Text_subtitles-colored__s5ggG').click();
        cy.wait(1000)

         //to handle the nudges 
         cy.get('body').then((main)=>{   
            cy.wait(2000);
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
            }})

            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)
            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)

            cy.get('div[class="NavigateTabGroup_tabgroup-container__SOWwd"] h5 span').each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Settlement')) {
                    $el.click();
                }
            })
            cy.wait(1000)
            cy.get('button[data-sd-event="download"]').click();
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] p').should('contain', 'Your file is being processed')
            cy.get('div[class="rs-modal-content"] p a').should('exist')
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] div button').click()
            cy.wait(1000)
            cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Analytics')) {
                $el.find('p').click();
            }
        })
        cy.get(' a[href="/analytics/reports"]').click();
        cy.wait(1000)
        cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').eq(0).each(($el)=>{
           const returnDownloadcsv=$el.find('p').text()   
           cy.log(returnDownloadcsv)   
          if(returnDownloadcsv.includes('Requests')){
            cy.wait(1000)
            $el.find('button[data-sd-event="downloadReport"]').click()
            cy.wait(1000)
          }
        })
    })

    it('ReturnRequests_02_09',function(){

        cy.visit(Cypress.env('url'))
        cy.get('.rs-input').type(9380879945);
        cy.get('.Button_button-primary__9i0Rz').click();
        cy.wait(2000);
        cy.get('.rs-input').type('0000');
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
        cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(5) a:nth-child(3) > div.Text_body2__0FftJ.Text_subtitles-colored__s5ggG').click();
        cy.wait(1000)

         //to handle the nudges 
         cy.get('body').then((main)=>{   
            cy.wait(2000);
            cy.log("nitin ",main.find('div[class="__floater__body"]').length)
              if(main.find('div[class="__floater__body"]').length>0){
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
                cy.get('#next').click()
                cy.wait(1000)
            }})

            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)
            cy.get('.Info_cursor-pointer__-pHVs').click();
            cy.wait(1000)

            cy.get('div[class="NavigateTabGroup_tabgroup-container__SOWwd"] h5 span').each(($el, index, $list) => {
                const tabHeaders = $el.text();
    
                if (tabHeaders.includes('Closed')) {
                    $el.click();
                }
            })
            cy.wait(1000)
            cy.get('button[data-sd-event="download"]').click();
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] p').should('contain', 'Your file is being processed')
            cy.get('div[class="rs-modal-content"] p a').should('exist')
            cy.wait(1000)
            cy.get('div[class="rs-modal-content"] div button').click()
            cy.wait(1000)
            cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)').trigger('mouseover');
        cy.wait(1000)
        cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($el, index, $list) => {
            const settings = $el.find('p').text();

            if (settings.includes('Analytics')) {
                $el.find('p').click();
            }
        })
        cy.get(' a[href="/analytics/reports"]').click();
        cy.wait(1000)
        cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').eq(0).each(($el)=>{
           const returnDownloadcsv=$el.find('p').text()   
           cy.log(returnDownloadcsv)   
          if(returnDownloadcsv.includes('Requests')){
            cy.wait(1000)
            $el.find('button[data-sd-event="downloadReport"]').click()
            cy.wait(1000)
          }
        })
    })
})
