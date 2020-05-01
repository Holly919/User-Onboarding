describe("Testing our form inputs", function() {
	beforeEach(function() {
        cy.visit("http///localhost:3000/ ")
    });
  });

  it("adds text to name input", function(){
    cy.get('[data-cy="name"]').type("Holly").should("have.value", "Holly");
    cy.get('[data-cy="email"]').type("email@email.com".should("have.value", "email@email.com");
    
    
    cy.get('[type="checkbox"]').check().should("be.checked");
    //cy.contains("Submit").click();
    cy.get("form").submit();
    });

