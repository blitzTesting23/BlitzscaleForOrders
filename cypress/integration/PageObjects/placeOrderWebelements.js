class placeOrderWebelements{

    productId='p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ Text_ellipsis__vYMZP"]'
    checkBox='.rs-checkbox-checker input'
infotextSVG(){
    return cy.get('.Info_cursor-pointer__-pHVs > span')
}

customerNumberField(){
    return cy.get(':nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input')
}
altContactField(){
    return cy.get(':nth-child(5) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input')
}

custNameField(){
    return cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input')
}

paymentMode(){
    return cy.get('.rs-btn-toolbar div')
}
pincodeField(){
    return cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input')
}

houseNumberField(){
    return cy.get(':nth-child(8) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input')
}

streetField(){
    return cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input')
}

landmarkField(){
    return cy.get('.rs-flex-box-grid-start > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input')
}

nextButton(){
    return cy.get('.Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz')
}
typeSelection(){
    return cy.get('.rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar')
}

inputBox(){
    return cy.get('.SearchProductDrawer_search-bar-style__whXrC .rs-input')
}

searchSVG(){
    return cy.get('.SearchProductDrawer_search-bar-style__whXrC button svg')
}
productLineItem(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]')
}

listItems(){
    return cy.get('div[role="listbox"] div[role="option"]')
}
comboHolder(){
    return cy.get('div[role="combobox"]')
}

addOrReset(){
    return cy.get('.rs-drawer-actions button')
}

quantityForItems(){
    return cy.get('div[class="custom-selectpicker rs-picker rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-has-value"]')
}

discountField(){
    return cy.get('.rs-picker-toggle-placeholder p')
}
amountInputField(){
    return cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-20"] input')
}

gridSVG(){
    return cy.get('div [class="rs-flex-box-grid-item rs-flex-box-grid-item-4"] svg')
}
productDetailsNext(){
    return cy.get('.ProductDetails_cta-style__Ktrhb > .rs-btn-toolbar > .Button_button-primary__9i0Rz')
}
CPname(){
    return cy.get('.Flexbox_gutter-lg__kVhG3 h4')
}

cpPageNextCTA(){
    return cy.get('.rs-flex-box-grid-end > .Button_button-primary__9i0Rz')
}

placeOrderCTA(){
    return cy.get('.ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz')
}
toastForSuccess(){
    return cy.get('.rs-notification-title-with-icon')
}

successpage(){
    return cy.get('div [class="heading2 Text_mb-lg__6jeKW"]')
}

awbFieldFromSuccessPage(){
    return cy.get('section[class="SuccessOrderPlaced_success-order-placed__TT0w1 Card_card__DkrpZ"] div span[class="Text_body2__0FftJ Text_headings-colored__kF2dK"]')
}

orderIDField(){
    return cy.get('section[class="SuccessOrderPlaced_success-order-placed__TT0w1 Card_card__DkrpZ"] div span[class="Text_body2__0FftJ Text_headings-colored__kF2dK Text_mr-lg__egpT+"]')
}

shopdeckHeaderImage(){
    return cy.get('div[class="css-2hndyu"] div[class="css-16nqket"] img')
}

}
export default placeOrderWebelements;