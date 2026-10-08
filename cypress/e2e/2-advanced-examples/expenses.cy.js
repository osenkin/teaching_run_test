import { faker } from "@faker-js/faker";
import ExpensesPage from "../../pageObjects/ExpensesPage";

describe("Test page Expenses from POM", () => {
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
		cy.get(".modal-footer .btn-primary").click();
	});

	context.skip("Create expense in expenses", () => {
		cy.contains("Fuel expenses").click();
		const getRandomFakerDate = () => {
			const today = new Date();
			const day = String(today.getDate()).padStart(2, "0");
			const month = String(today.getMonth() + 1).padStart(2, "0");
			const year = today.getFullYear();
			return `${day}.${month}.${year}`;
		};
		const fakerMiliage = faker.number.int({ min: 1000, max: 10000 }).toString();
		ExpensesPage.addExpenseButton.click();
		ExpensesPage.reportDateInput.clear().type(getRandomFakerDate());
		ExpensesPage.miliageInput.clear().type(fakerMiliage);
		ExpensesPage.numbersOfLitersInput.type("50");
		ExpensesPage.totalCostInput.type("100");
		cy.get(".modal-footer .btn-primary").click();
		cy.contains("50").should("be.visible");
		cy.contains("100").should("be.visible");
	});
});
