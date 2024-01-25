class WebsiteWebElements{

    dialogueForWebsite='div[role="dialog"]'
    
startShoppingBanner(){
    return cy.get('button[class="css-1jt1w2w"]')
}
naviagtionBar(){
    return cy.get('div[id="bottomNavigationTab"] div p')
}

phoneNoField(){
    return cy.get('input[class="css-1vw8438"]')
}
confirmPhoneNumberButton(){
    return cy.get('button[class="css-1jt1w2w"] div')
}
passwordField(){
    return cy.get('div[class="css-1wuu179"] div input')
}

verifyButton(){
    return cy.get('div[class="css-1wblxr5"] button')
}
orderListings(){
    return cy.get('div[class="css-rcrhzw"]')
}

returnOrderCTA(){
    return cy.get('button[class="css-19qf114"] div')
}

returnReasonOption(){
    return cy.get('div[class="css-32ylmd"] div[class="css-10acm89"] input')
}

nextCTAforReason(){
    return cy.get('div[class="css-2f3j1g"]')
}
uploadMediainput(){
    return cy.get('input[type="file"]')
}

remarksInputField(){
    return cy.get('div[class="css-36kz9e"] textarea')
}
nextButtonForMediaUpload(){
    return cy.get('.css-1gg5jq4 button')
}
radioForReturnProduct(){
    return cy.get('.css-l59vbx input[type="radio"]')
}

checkboxForconformPage(){
    return cy.get('.css-lwshl4 input[type="checkbox"]')
}

ConformButton(){
    return cy.get('button[class="css-1jt1w2w"]')
}

finalConformButton(){
    return cy.get('button[class="css-1jt1w2w"]')
}

returnConfirmInfo(){
    return cy.get('p[class="css-1519snz"]')
}
returnStatus(){
    return cy.get('p[class="css-dx5hkr"]')
}

cancelReturnCTA(){
    return cy.get('button[class="css-19qf114"] div')
}

homePage(){
    return cy.get('div[class="css-2hndyu"] div[class="css-16nqket"] img')
}

searchSVG(){
    return cy.get('div[class="css-5gxtus"] svg')
}

inputForSearch(){
    return cy.get('div[class="css-1wb5dxz"] input')
}

productname(){
    return cy.get('div[class="css-1hwavc7"] div[class="css-t91x6f"]')
}
buttonForBuyNow(){
    return cy.get('button[class="css-1jt1w2w"]')
}

inputFieldFOrAddress(){
    return cy.get('div[class="css-1mnj8i4"] input ')
}

saveAndContinueButton(){
    return cy.get('div[class="css-1i2ig35"] button')
}

proceedButton(){
    return cy.get('button[class="css-1l968gz"]')
}
payCODOption(){
    return cy.get('div[class="css-frlv6x"] div[class="css-1pwpv5d"] div[class="css-ha9uku"]')
}

placeOrder(){
    return cy.get('button[class="css-1l968gz"]')
}

notNowOption(){
    return cy.get('button[class="css-19qf114"]')
}
orderSuccessPage(){
    return cy.get('.css-1datt40')
}

orderItem(){
    return cy.get('a[class="css-uxj08"]')
}

wantToOrderMore(){
    return cy.get('.css-19qf114 > .css-2f3j1g')
}

getBodyforWebsite(){
    return cy.get('body')
}



}
export default WebsiteWebElements ;