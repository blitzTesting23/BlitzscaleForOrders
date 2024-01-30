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

areaCheckedFalse(){
    return cy.get('[aria-checked="false"]')
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

inputForQC(){
    return cy.get('input[class="rs-input rs-input-md"]')
}
qcInfoText(){
    return cy.get('div[class="QcCheckListModal_modal-wrapper__deLhQ"] p[class="Text_body2__0FftJ Text_headings-colored__kF2dK Text_ml-sm__WjbvN"]')
}

qcProductPhotos(){
    return cy.get('button[data-sd-event="returnRequestAccept"]')
}

qcDetails(){
    return cy.get('p[class="Text_body2__0FftJ Text_ml-sm__WjbvN"]')
}
autoSettlementFields(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-top__Nx4Aj Flexbox_mt-lg__HQln6 rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] p[class="Text_body2__0FftJ"]')
}
autoSettlementFieldTwo(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-top__Nx4Aj Flexbox_mt-lg__HQln6 AcceptReturnModal_items-wrapper__vCGoC rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] p[class="Text_body2__0FftJ"]')
}

NoReturnOptionForShipping(){
    return cy.get('span[class="Label_label-type-secondary__OQZ2g Label_label-state-subtle__xZJ5A"]')
}

settlementMethod(){
    return cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mb-xs__FA03i"]')
}

settlementStatusForSettlementPending(){
    return cy.get('span[class="Label_label-type-primary__zRewS Label_label-state-warning__VGGMw"]')
}

autosettlementForSettlementPending(){
    return cy.get('div[class="Table_card-cell__MSHm0 Table_padding-horizontal-md__mL+44 Table_padding-vertical-default__KZdfK rs-flex-box-grid-item rs-flex-box-grid-item-0 rs-col rs-col-xl-3 rs-col-lg-3 rs-col-md-4 rs-col-sm-6"]')
}

refundLink(){
    return cy.get('div[class="Table_card-cell__MSHm0 Table_padding-horizontal-md__mL+44 Table_padding-vertical-default__KZdfK rs-flex-box-grid-item rs-flex-box-grid-item-0 rs-col rs-col-xl-3 rs-col-lg-3 rs-col-md-4 rs-col-sm-6"] div[class="Flexbox_flex-row__aKbHb Flexbox_mt-md__t3QK2 rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] a')
}

sendRefundLink(){
    return cy.get('div[class="SettlementTable_button-wrapper__q7pRx"] button[data-sd-event="returnRequestSettlementList"]')
}
paidOffline(){
    return cy.get('button[class="Button_button-ghost__rieSu button-loading-undefined custom-button rs-btn rs-btn-ghost rs-btn-md rs-btn-block"]')
}

forReturnOrReplace(){
    return cy.get('div[role="group"] button')
}

rejectionReason(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-middle__-J0b5 Flexbox_mt-sm__1BOrf RejectReturnModal_items__Y1mhR rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] p')
}

rejectionRemark(){
    return cy.get('div[class="Flexbox_flex-column__cNkZ2 rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] p')
}

requestActionForRejected(){
    return cy.get('span[class="Label_label-type-primary__zRewS Label_label-state-failure__lE+CF label-style"]')
}

approvedRequestStatusNA(){
    return cy.get('span[class="Label_label-type-secondary__OQZ2g Label_label-state-subtle__xZJ5A label-style"]')
}

shippingStatusinclosedtab(){
    return cy.get('span[class="Label_label-type-primary__zRewS Label_label-state-failure__lE+CF ShippingDetailsLabel_label-style__XRwqi"]')
}

rejectionReason(){
    return cy.get('div[class="refund-state-wrapper"] p')
}

ongoingTabButtons(){
    return cy.get('div[class="OngoingTable_column-padding-right__pFsrP"] button')
}
requestActionApproved(){
    return cy.get('span[class="Label_label-type-primary__zRewS Label_label-state-success__ioqGl label-style"]')
}

failedApprovedRequestStatus(){
    return cy.get('span[class="Label_label-type-secondary__OQZ2g Label_label-state-failure__lE+CF label-style"]')
}

detailsButtonFoeClosedTab(){
    return cy.get('button[data-sd-event="returnRequestClosedList"]')
}

}
export default ApproveRequests;