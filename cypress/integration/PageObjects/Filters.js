class Filters{

getSearchFilterDropDown(){
   return cy.get('div[class="InputSearch_input-search__utz3W rs-input-group"] div[role="combobox"]') //clicks on the search 
}
getFilterOptionsfromtheDropdown(){
   return  cy.get('div[role="listbox"] div[role="option"]') //gets all the options when we click on the search 
}

getInputBoxForSearchFilter(){
return cy.get('input[placeholder="Search"]') //input box for the search filter 
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
    return cy.get('div[class="Table_card-cell__MSHm0 Table_padding-horizontal-md__mL+44 rs-flex-box-grid-item rs-flex-box-grid-item-0 rs-col rs-col-xl-4 rs-col-lg-5 rs-col-md-5 rs-col-sm-7"] button')
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
}
export default Filters;