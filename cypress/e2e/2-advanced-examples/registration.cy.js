describe("Тестування форми реєстрації", () => {
	const getUniqueEmail = () => `test.user+${Date.now()}@gmail.com`;

	beforeEach(() => {
		cy.visit("https://qauto.forstudy.space/", {
			auth: {
				username: "guest",
				password: "welcome2qauto",
			},
		});
		cy.get(".btn").contains("Sign In").click();
		cy.get(".btn").contains("Registration").click();
	});

	//HAPPY PATH

	it("Успішна реєстрація з валідними даними", () => {
		cy.get("#signupName").type("John");
		cy.get("#signupLastName").type("Travolta");
		cy.get("#signupEmail").type(getUniqueEmail());
		cy.get("#signupPassword").type("Password123", { sensitive: true });
		cy.get("#signupRepeatPassword").type("Password123", { sensitive: true });

		cy.get(".modal-footer .btn-primary").should("not.be.disabled").click();
		cy.url().should("include", "/panel/garage");
	});

	it("Валідація функції trim для полів first and last name", () => {
		const firstName = "  John  ";
		const lastName = "  Travolta  ";
		cy.get("#signupName").type(firstName.trim());
		cy.get("#signupLastName").type(lastName.trim());
		cy.get("#signupEmail").type(getUniqueEmail());
		cy.get("#signupPassword").type("Password123", { sensitive: true });
		cy.get("#signupRepeatPassword").type("Password123", { sensitive: true });

		cy.get(".modal-footer .btn-primary").should("not.be.disabled");
	});

	// NEGATIVE TESTS

	describe("Перевірка обов'язкових полів (isMandatory) та пустих значень", () => {
		it("Помилки при спробі залишити поля пустими", () => {
			cy.get("#signupName").focus().blur();
			cy.contains("Name required").should("be.visible");
			cy.get("#signupName").should(
				"have.css",
				"border-color",
				"rgb(220, 53, 69)",
			);

			cy.get("#signupLastName").focus().blur();
			cy.contains("Last name required").should("be.visible");
			cy.get("#signupLastName").should(
				"have.css",
				"border-color",
				"rgb(220, 53, 69)",
			);

			cy.get("#signupEmail").focus().blur();
			cy.contains("Email required").should("be.visible");
			cy.get("#signupEmail").should(
				"have.css",
				"border-color",
				"rgb(220, 53, 69)",
			);

			cy.get("#signupPassword").focus().blur();
			cy.contains("Password required").should("be.visible");
			cy.get("#signupPassword").should(
				"have.css",
				"border-color",
				"rgb(220, 53, 69)",
			);

			cy.get("#signupRepeatPassword").focus().blur();
			cy.contains("Re-enter password required").should("be.visible");
			cy.get("#signupRepeatPassword").should(
				"have.css",
				"border-color",
				"rgb(220, 53, 69)",
			);

			cy.get(".modal-footer .btn-primary").should("be.disabled");
		});
	});

	describe("Валідація полів Name та Last Name", () => {
		it("Помилка, якщо ім'я занадто коротке (менше 2 символів)", () => {
			cy.get("#signupName").type("A").blur();
			cy.contains("Name has to be from 2 to 20 characters long").should(
				"be.visible",
			);
			cy.get(".modal-footer .btn-primary").should("be.disabled");
		});

		it("Помилка, якщо прізвище занадто довге (більше 20 символів)", () => {
			cy.get("#signupLastName").type("Annanathanielchristopher").blur();
			cy.contains("Last name has to be from 2 to 20 characters long").should(
				"be.visible",
			);
			cy.get(".modal-footer .btn-primary").should("be.disabled");
		});

		it("Помилка при введенні не англійських символів або цифр", () => {
			cy.get("#signupName").type("Петро").blur();
			cy.contains("Name is invalid").should("be.visible");

			cy.get("#signupLastName").type("Travolta123").blur();
			cy.contains("Last name is invalid").should("be.visible");

			cy.get(".modal-footer .btn-primary").should("be.disabled");
		});
	});

	describe("Валідація Email", () => {
		it("Помилка при некоректному форматі email", () => {
			cy.get("#signupEmail").type("invalid-email.com").blur();
			cy.contains("Email is incorrect").should("be.visible");
			cy.get("#signupEmail").should(
				"have.css",
				"border-color",
				"rgb(220, 53, 69)",
			);
			cy.get(".modal-footer .btn-primary").should("be.disabled");
		});
	});

	describe("Валідація Password та Re-enter password", () => {
		const passwordError =
			"Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

		it("Помилка: пароль занадто короткий", () => {
			cy.get("#signupPassword").type("Pas1").blur();
			cy.contains(passwordError).should("be.visible");
		});

		it("Помилка: пароль без цифр", () => {
			cy.get("#signupPassword").type("Password").blur();
			cy.contains(passwordError).should("be.visible");
		});

		it("Помилка: пароль без великої літери", () => {
			cy.get("#signupPassword").type("password123").blur();
			cy.contains(passwordError).should("be.visible");
		});

		it("Помилка: паролі не збігаються", () => {
			cy.get("#signupPassword").type("Password123");
			cy.get("#signupRepeatPassword").type("Password321").blur();

			cy.contains("Passwords do not match").should("be.visible");
			cy.get("#signupRepeatPassword").should(
				"have.css",
				"border-color",
				"rgb(220, 53, 69)",
			);
			cy.get(".modal-footer .btn-primary").should("be.disabled");
		});
	});
});
