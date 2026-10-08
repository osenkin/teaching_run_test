import GaragePage from "../../pageObjects/GaragePage";

describe("Hybrid UI/API testing", () => {
	let carId;
	const carMileage = 1000;

	const today = new Date();
	const apiDate = today.toISOString().split("T")[0];

	skip.beforeEach(() => {
		const username = Cypress.env("authUsername");
		const password = Cypress.env("authPassword");
		const rawBaseUrl = Cypress.config("baseUrl");

		const baseUrl = rawBaseUrl.replace("https://", "");
		const cleanupUrl = baseUrl.replace(/\/$/, "");
		const authentication = `https://${username}:${password}@${cleanupUrl}`;
		cy.visit(authentication);

		cy.contains("Sign In").click();
		cy.get("#signinEmail").type("test.user+123@gmail.com");
		cy.get("#signinPassword").type("Test1234", { sensitive: true });
		cy.contains("Login").click();
	});

	skip.it("Full cycle: create automation from UI to API", () => {
		cy.intercept("POST", "/api/cars").as("createCarRequest");

		GaragePage.garageTitle.should("have.text", "Garage");
		GaragePage.addCar("BMW", "3", carMileage.toString());
		cy.contains("BMW 3").should("be.visible");

		cy.wait("@createCarRequest").then((interception) => {
			expect(interception.response.statusCode).to.equal(201);
			carId = interception.response.body.data.id;

			cy.request("GET", "/api/cars").then((apiResponse) => {
				expect(apiResponse.status).to.equal(200);

				const carList = apiResponse.body.data;
				const foundCar = carList.find((car) => car.id === carId);

				expect(foundCar).to.exist;
				expect(foundCar.brand).to.equal("BMW");
				expect(foundCar.model).to.equal("3");
				expect(foundCar.initialMileage).to.equal(carMileage);

				const expenseData = {
					mileage: carMileage + 500,
					liters: 50,
					totalCost: 100,
					reportedAt: apiDate,
				};

				cy.createExpenseViaApi(carId, expenseData).then((expenseResponse) => {
					expect(expenseResponse.status).to.equal(200);

					expect(expenseResponse.body.data).to.have.property("id");
					expect(expenseResponse.body.data.carId).to.equal(carId);
					expect(expenseResponse.body.data.mileage).to.equal(
						expenseData.mileage,
					);
					expect(expenseResponse.body.data.liters).to.equal(expenseData.liters);

					cy.contains("Fuel expenses").click();
					cy.contains(expenseData.mileage.toString()).should("be.visible");
					cy.contains(expenseData.liters.toString()).should("be.visible");
					cy.contains(expenseData.totalCost.toString()).should("be.visible");
				});
			});
		});
	});
});
