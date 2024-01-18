class Filters{

    firstGridCell='div[class="Table_card-cell__MSHm0 Table_padding-horizontal-lg__hWECV Table_padding-vertical-default__KZdfK rs-flex-box-grid-item rs-flex-box-grid-item-0 rs-col rs-col-xl-3 rs-col-lg-4 rs-col-md-5 rs-col-sm-7"]'

getSearchFilterDropDown(){
   return cy.get('div[class="InputSearch_input-search__utz3W rs-input-group"] div[role="combobox"]') //clicks on the search 
}
getFilterOptionsfromtheDropdown(){
   return  cy.get('div[role="listbox"] div[role="option"]') //gets all the options when we click on the search 
}

getInputBoxForSearchFilter(){
return cy.get('div[class="InputSearch_input-search__utz3W rs-input-group"] input[placeholder="Search"]') //input box for the search filter 
}

getSearchSVG(){
   return  cy.get('button[class="rs-input-group-addon rs-input-group-btn rs-btn rs-btn-default"]') //search svg click 
}

searchResultCard(){
    return cy.get('.Table_table-wrapper__SnI4U div[class="Table_sticky-table-header__8xY33"]') //the result card where the details are shown 
}

OrderDetailsLineItem(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]') //The line items from the result card 
}
OrderIDFromtheOrderdetailsLineItem(){
    return cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_mt-xs__jNeDZ"]')  ///Order ID from the order details card 
}


buttonListfromtheOrderLineItem(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] button') //the buttons for More Details,view all"x"files,Approve,Reject
}
resultcardwithNoItems(){
    return cy.get('.Table_table-wrapper__SnI4U div[class="Table_sticky-table-header__8xY33"] p') //to check the searched results are not found 
}

filterPlaceHolder(){
    return cy.get('.rs-picker-toggle-placeholder ')
}
dropdownItems(){
    return cy.get('div[role="listbox"] div[role="option"]')
}
clickonPlaceHolder(){
    return cy.get('.rs-picker-toggle.rs-picker-toggle-active.rs-btn.rs-btn-default.rs-btn-md')
}
clearAllAndApply(){
    return cy.get('div[role="toolbar"]')
}
searchResultNotFound(){
    return cy.get('.Table_table-wrapper__SnI4U h4')
}
returnReasonOption(){
    return cy.get('.rs-picker-value-item')
}
closeSVGforReturnReason(){
    return cy.get('span[class="rs-picker-toggle-clean rs-btn-close"]')
}
phoneNumberAddressfieldForNR(){
    return cy.get('div[class="Table_card-cell__MSHm0 Table_padding-horizontal-md__mL+44 rs-flex-box-grid-item rs-flex-box-grid-item-0 rs-col rs-col-xl-3 rs-col-lg-3 rs-col-md-6 rs-col-sm-8"] p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG"]')
}

moredetailsctaButton(){
    return cy.get('div[class="Table_sticky-table-header__8xY33"] div:nth-child(3) button')
}
contentsFromSideBarFromMoreDetails(){
    return cy.get('.rs-drawer-content p')
}
visitWebsite(){
    return cy.get('.rs-drawer-content')
}
actionColumnCTA(){
    return cy.get('div[class="Flexbox_flex-column__cNkZ2 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] button')
}
headerForApproveAndReject(){
    return cy.get('.rs-drawer-content h4')
}
selectRejectionReasonPlaceholder(){
    return cy.get('div[class="custom-selectpicker rs-picker rs-picker-select rs-picker-default rs-picker-toggle-wrapper rs-picker-block"]')
}
selectrejectionReasonDropdown(){
    return cy.get('div[role="listbox"] div[role="option"] span')
}
inputForRejectionRemark(){
    return  cy.get('div[class="Input_input-group__c6y0f undefined rs-input-group"] textarea')
}
rejectOrAcceptCTA(){
    return cy.get('.rs-drawer-actions button')
}
resetAllFilters(){
    return cy.get('.Flexbox_flex-column__cNkZ2 > .Button_button-primary__9i0Rz')
}

returnShippingColumn(){
    return cy.get('div[class="Table_sticky-table-header__8xY33"] div:nth-child(5)')
}
awbNumberfield(){
    return cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_mt-xs__jNeDZ Text_cursor-pointer__vwE5X"]')
}
customerInfoitems(){
    return cy.get('div[class="OngoingTable_customer-info-wrapper__saU4g"] p')
}

returnStatusFilter(){
    return cy.get('.rs-picker-toggle-placeholder p')
}

shippingStatus(){
    return cy.get('div[class="Table_sticky-table-header__8xY33"] div:nth-child(5) span[class="Label_label-type-primary__zRewS Label_label-state-primary__dL5r6 ShippingDetailsLabel_label-style__XRwqi"]')
}
moreFiltersOption(){
    return cy.get('button[data-sd-event="moreFilter"]')
}
requestedOnfieldDetails(){
    return cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_ml-md__DqNfo Text_break-word__oIh4U"]').parent()
}

settlementMethodDetails(){
    return cy.get('div[class="Table_card-cell__MSHm0 Table_padding-horizontal-md__mL+44 rs-flex-box-grid-item rs-flex-box-grid-item-0 rs-col rs-col-xl-3 rs-col-lg-4 rs-col-md-6 rs-col-sm-6"]  p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG"]')
}

autoSettlementDetails(){
    return cy.get('div[class="Table_card-cell__MSHm0 Table_padding-horizontal-md__mL+44 rs-flex-box-grid-item rs-flex-box-grid-item-0 rs-col rs-col-xl-3 rs-col-lg-3 rs-col-md-6 rs-col-sm-6"] p')
}

autoSettleementDropdownoptions(){
    return cy.get('div[class="RadioPicker_checkpicker-radiogroup__+Wree rs-radio-group rs-radio-group-default"]')
}

settlementMethodForPickupFailed(){
    return cy.get('div[class="Table_sticky-table-header__8xY33"] div:nth-child(4) p')
}
spanforMoredetails(){
    return cy.get('.rs-drawer-content span')
}
shippingstatusForSettlementPending(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] div:nth-child(5)  span')
}
settlementMethodForSettlementTab(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] div:nth-child(6)  p')
}
settlementStatusForSettlementTab(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"] div:nth-child(6)  span')
}

awbFieldForClosedRequest(){
    return cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_cursor-pointer__vwE5X"]')
}

moreDetailsButtonForClosedTab(){
    return cy.get('.rs-col-xl-4 > .button-link')
}
shippingStatusForClosedTab(){
    return cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]')
}

morefiltersForClosedTab(){
return cy.get("button[data-sd-event='moreFilters']")
}

requestSourceForClosedTab(){
    return cy.get('div[class="Table_card-cell__MSHm0 Table_padding-horizontal-md__mL+44 rs-flex-box-grid-item rs-flex-box-grid-item-0 rs-col rs-col-xl-2 rs-col-lg-3 rs-col-md-5 rs-col-sm-12"]')
}
}
export default Filters;