class SidebarAndMisc{
    url(){
        return cy.visit('http://v2.nushop-dashboard.kaip.in/')
    }
    enterPhoneNumberAndOTP(){
        return cy.get('.rs-input')
    }
    submit(){
       return  cy.get('.Button_button-primary__9i0Rz')
    }
    sidebarwidgets(){
        return cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(1)')
    }
    sidebarMenuItems(){
        return cy.get('div[class="SideNav_sidenav-item-container__PAVyt"] div[class="Flexbox_flex-row__aKbHb SideNav_menuitem-holder__QMiAA rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]')
    }
    returnRequests(){
        return cy.get('a[href="/orders/return-requests"]')
    }
    expenseLedger(){
        return cy.get(' a[href="/finance/expense-ledger"]')
    }
    returnAndExchangeSettings(){
return cy.get('div.SideNav_sidenav-container__8XqV0 nav.sidenav-bar div.SideNav_sidenav-item-container__PAVyt div.SideNav_submenuitem-holder__dRus9:nth-child(18) > a:nth-child(8)')
    }
    ongoingTabField(){
        return cy.get('span[class="tab return-request-card-3"]')
    }

    expenseLedgeramount(){
        return cy.get('div[class="PnlHeaderCard_linear-gradient-primary__L+uim"]')
    }

    noresultFound(){
        return cy.get('.Table_table-wrapper__SnI4U h4')
    }

    columnHeaderForTab(){
        return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-middle__-J0b5 Flexbox_nowrap__8vOkG Table_card-container-header__9xhmg rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]')
    }
    returnRequestSubTabs(){
        return cy.get('div[class="NavigateTabGroup_tabgroup-container__SOWwd"] h5 span')
    }
   
     }
     export default SidebarAndMisc;