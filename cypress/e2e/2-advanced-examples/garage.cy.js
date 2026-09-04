import GaragePage from "../../pageObjects/GaragePage";

describe("Test page Garage from POM", () => {
	beforeEach(() => {
		const username = Cypress.env("authUsername");
		const password = Cypress.env("authPassword");
		const baseUrl = Cypress.config("baseUrl");
		const cleanupUrl = baseUrl.replace("https://", "");
		const authentication = `https://${username}:${password}@${cleanupUrl}`;
		cy.visit(authentication);

		cy.contains("Sign In").click();
		cy.get("#signinEmail").type("test.user+123@gmail.com");
		cy.get("#signinPassword").type("Test1234");
		cy.contains("Login").click();
	});

	it("Great create auto in garage", () => {
		GaragePage.garageTitle.should("have.text", "Garage");
		GaragePage.addCar("Porsche", "911", "1000");
		cy.contains("Porsche 911").should("be.visible");
	});
});
