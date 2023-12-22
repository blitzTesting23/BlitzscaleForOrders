class Settings{
unboxingVideoField(){
    return cy.get('div[class="Return_form-wrapper__G5DT6 rs-flex-box-grid-item rs-flex-box-grid-item-24"]:nth-child(2)')
}

clickOnSave()
{
    return cy.get('.Flexbox_flex-row__aKbHb > .Button_button-primary__9i0Rz')
}
toastMessage()
{
    return cy.get('.rs-notification-title-with-icon')
}
clickOnVideMandatory()
{
    return cy.get('.ChipButton_chip-button__xXNaz')
}

returnChargesDropdown(){
    return cy.get(':nth-child(3) > .rs-picker > .rs-picker-toggle > .rs-stack > [style="flex-grow: 1; overflow: hidden;"] > .rs-picker-toggle-value')
}
listbox(){
    return cy.get('div[role="listbox"]')
}
returnChargeAmount(){
    return cy.get('input[class="rs-input rs-input-md"]')
}
hiddencustomcharges(){
    return cy.get(':nth-child(3) > .rs-picker > .rs-picker-toggle > .rs-stack > [style="flex-grow: 1; overflow: hidden;"]')
}
refundInfotoCustomers(){
    return  cy.get(':nth-child(6) > .rs-picker > .rs-picker-toggle > .rs-stack > [style="flex-grow: 1; overflow: hidden;"] > .rs-picker-toggle-value')
}

refundInfotoCustomerstwo(){
    return cy.get(':nth-child(4) > .rs-picker > .rs-picker-toggle > .rs-stack > [style="flex-grow: 1; overflow: hidden;"] > .rs-picker-toggle-value')
}
returnFlowTypedropdown(){
    return cy.get(':nth-child(1) > .rs-picker > .rs-picker-toggle > .rs-stack > [style="flex-grow: 1; overflow: hidden;"] > .rs-picker-toggle-value')
}
areaDisabledFieldTrue(){
    return cy.get('div [aria-disabled="true"]')
}
submitReturnRequestOption(){
    return cy.get('[aria-selected="true"] > .rs-picker-select-menu-item')
}
}


export default Settings;