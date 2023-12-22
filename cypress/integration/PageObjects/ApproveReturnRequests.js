class ApproveRequests{
header(){
    return cy.get('div[class="rs-drawer-header"] h4') //header for the approve return requests 
}
bookreturnshipmenttext(){
    return cy.get('div[class="rs-flex-box-grid-item rs-flex-box-grid-item-22"] p[class="Text_body2__0FftJ Text_mt-xs__jNeDZ"]') //Book return shipment text 
}
qcOnReturnText(){
    return cy.get('p[class="Text_body2__0FftJ Text_mt-xs__jNeDZ Text_mb-sm__m812n"]')  //QC on return text 
}

autoSettlementText(){
    return cy.get('div[class="rs-flex-box-grid-item rs-flex-box-grid-item-22"] p[class="Text_body2__0FftJ"]') //Auto Settlement text 
}

shippingPartnerCheck(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]') //shipping partners availability check  
}

shippingPartnerList(){
    return  cy.get('div[class="Flexbox_flex-row__aKbHb rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] div[role="gridcell"] p') //shipping partner List 
}

approveButton(){
    return cy.get('div[class="rs-drawer-actions"] button') //button to approve the request 
}

qcCheckListButton(){
    return cy.get('div[class="rs-flex-box-grid-item rs-flex-box-grid-item-22"] button') //Button for QC checklist 
}
productTypeDropDown(){
    return cy.get('.QcCheckListModal_modal-wrapper__deLhQ > :nth-child(3) .rs-stack') //product type selection dropdown 
}

optionsfromtheDropdown()
{
    return cy.get('div[role="listbox"] div[role="option"] span') //options from the dropdown from were we can select items 
}
sizeDropdown(){
    return cy.get('.QcCheckListModal_modal-wrapper__deLhQ > :nth-child(4) .rs-stack')  //size dropdown 
}
inputboxforColor(){
    return  cy.get('div[class="Input_input-group__c6y0f undefined rs-input-group"] input') //input box for the color 
}

awbforOnfgoingTab(){
    return cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_mt-xs__jNeDZ Text_cursor-pointer__vwE5X"]')
}

trackLink(){
    return cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_ellipsis__vYMZP"] a')
}
settlementStatus(){
    return cy.get(':nth-child(1) > :nth-child(6) > div > .Text_body2__0FftJ')
}
autoSettlement(){
    return cy.get(':nth-child(1) > .rs-col-lg-3.rs-col-md-6 > .Text_body2__0FftJ')
}
returnshippingstatus(){
    return cy.get('span[class="Label_label-type-primary__zRewS Label_label-state-subtle__xZJ5A ShippingDetailsLabel_label-style__XRwqi"]') //Returnstatus for the ongoing tab 
}

checkboxForApproveReturnRequest(){
    return cy.get('input[type="checkbox"]')
}
areaCheckedTrue(){
    return cy.get('[aria-checked="true"]')
}

returnOrderRefundOrderID(){
    return cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(1) div:nth-child(5) p')
}

shippingChargeOrderID(){
    return cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(2) div:nth-child(5) p')
}

spendTypeForReturnOrderRefund(){
    return cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(1) div:nth-child(3) p')
}
spendTypeForShippingcharge(){
    return cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(2) div:nth-child(3) p')
}

amountForReturnOrderRefund(){
    return cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(1) div:nth-child(4) p')
}

amountForShippingCharge(){
    return cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(2) div:nth-child(4) p')
}
triggerForOrderRefund(){
    return cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(1) div:nth-child(7) p')
}
triggerForShippingCharge(){
    return cy.get('div[class="Table_table-wrapper__SnI4U "] div div:nth-child(2) div:nth-child(7) p')
}
}
export default ApproveRequests;