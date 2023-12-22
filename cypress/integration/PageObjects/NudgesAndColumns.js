 class NudgesAndColumns{
getNudges(){
   return cy.get('#next')
}
getBody(){
    return cy.get('body');
}
getinfobutton(){
    return cy.get('.Info_cursor-pointer__-pHVs')
}

 }
 export default NudgesAndColumns;