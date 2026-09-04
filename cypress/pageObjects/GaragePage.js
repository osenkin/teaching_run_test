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

	addCar(brand, model, mileage) {
		this.addCarButton.click();
		this.carBrandSelect.select(brand);
		this.carModelSelect.select(model);
		this.carMileageInput.type(mileage);
		this.submitcarButton.click();
	}
}
export default new GaragePage();
