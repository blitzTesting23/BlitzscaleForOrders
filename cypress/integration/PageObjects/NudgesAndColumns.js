 class NudgesAndColumns{

    awbField='p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_cursor-pointer__vwE5X"]'
    dialogue='div[role="dialog"]'
    gridcell='div[role="gridcell"]'
    floater='div[class="__floater__body"]'
    optionSelect='span[class="rs-checkbox-wrapper"]'
    radioOption='label[class="RadioPicker_radio-label__p6kzr"]'
    downloadReport='button[data-sd-event="downloadReport"]'
    phoneNumberFromOrderID= 'p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_mr-sm__tMf47"]'
getNudges(){
   return cy.get('#next')
}
getBody(){
    return cy.get('body');
}
getinfobutton(){
    return cy.get('.Info_cursor-pointer__-pHVs')
}

shippingDetailsHover(){
    return cy.get('.rs-col-xl-4.rs-col-md-6 > :nth-child(1) > .Flexbox_flex-row__aKbHb > .Text_body3__jmTqb')
}
nudgeClick(){
    return cy.get('.Button_button-ghost__rieSu')
}

 }
 export default NudgesAndColumns;