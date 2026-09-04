class ExpensesPage {
	get addExpenseButton() {
		return cy.contains("Add an expense");
	}
	get reportDateInput() {
		return cy.get("#addExpenseDate");
	}

	get miliageInput() {
		return cy.get("#addExpenseMileage");
	}

	get numbersOfLitersInput() {
		return cy.get("#addExpenseLiters");
	}
	get totalCostInput() {
		return cy.get("#addExpenseTotalCost");
	}
	get expenseTitle() {
		return cy.get("h1");
	}
	addExpense(liters, date, mileage, totalCost) {
		this.reportDateInput.clear().type(date);
		this.miliageInput.clear().type(mileage);
		this.numbersOfLitersInput.clear().type(liters);
		this.totalCostInput.clear().type(totalCost);
		cy.get(".modal-footer .btn-primary").click();
	}
}

export default new ExpensesPage();
