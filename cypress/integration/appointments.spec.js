describe("Appointments", () => {

  beforeEach(() => {
    cy.request("localhost:8001/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {

    // 1. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
    .first()
    .click();
    
    // 2. Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // 3. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // 4. Clicks the save button
    cy.contains("button", "Save").click();
    
    // 5. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {
    
    // 1. Click edit button
    cy.get("[alt=Edit]").click({force: true});
    
    // 2. Clear existing name
    cy.get("[data-testid=student-name-input]").clear();

    // 3. Enter new student name and choose interviewer
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();


    // 4. Clicks the save button
    cy.contains("button", "Save").click();
    
    // 5. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {

    // 1. Click delete button
    cy.get("[alt=Delete]").click({force: true});

    // 2. Click confirm button
    cy.get("button").contains("Confirm").click({force: true});

    // 3. Check Deleting message is displayed
    cy.contains("Deleting...");

    // 4. Check Deleting message is hidden
    cy.contains("Deleting...").should("not.exist");

    // 5. Check student name is removed
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");

  })


});