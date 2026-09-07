class GaragePage {
	get addCarButton() {
		return cy.contains("Add car");
	}
	get carBrandSelect() {
		return cy.get("#addCarBrand");
	}
	get carModelSelect() {
		return cy.get("#addCarModel");
	}
	get carMileageInput() {
		return cy.get("#addCarMileage");
	}
	get submitcarButton() {
		return cy.get(".modal-footer .btn-primary");
	}
	get garageTitle() {
		return cy.get("h1");
	}

	// У файлі POM GaragePage перепиши метод так:
	addCar(brand, model, mileage) {
		this.addCarButton.click();

		// Вибираємо елементи за індексом (0 — перший, 1 — другий і так далі)
		this.carBrandSelect.select(1); // Вибере другий бренд у списку
		cy.wait(500);
		this.carModelSelect.select(0); // Вибере першу доступну модель для цього бренду

		this.carMileageInput.clear().type(mileage);
		this.submitcarButton.click();
	}
}
export default new GaragePage();
