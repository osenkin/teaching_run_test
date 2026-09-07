/// <reference types='cypress' />
describe("Реєстрація користувача", () => {
	const getUnicEmail = () => `test.email${Date.now()}@example.com`;

	beforeEach(() => {
		const username = Cypress.env("authUsername");
		const password = Cypress.env("authPassword");
		const baseUrl = Cypress.config("baseUrl");
		const cleanupUrl = baseUrl.replace("https://", "");
		const authentication = `https://${username}:${password}@${cleanupUrl}`;
		cy.visit(authentication);
	});

	it("Registation new user", () => {
		cy.contains("Sign up").click();
		cy.get("#signupName").type("TestUser");
		cy.get("#signupLastName").type("TestLastName");
		cy.get("#signupEmail").type(getUnicEmail());
		cy.get("#signupPassword").type("TestPassword123");
		cy.get("#signupRepeatPassword").type("TestPassword123");
		cy.get(".modal-footer .btn-primary").click();
		cy.url().should("include", "/panel/garage");
	});
});
