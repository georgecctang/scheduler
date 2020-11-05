describe("Navigation", () => {

  it("should navigate to Tuesday", () => {
    cy.request("localhost:8001/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class","day-list__item--selected");
    
  });

  it("should navigate to Tuesday again", () => {
    cy.request("localhost:8001/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class","day-list__item--selected");
  });


});