describe("example to-do app", () => {
	beforeEach(() => {
		cy.visit("https://qauto.forstudy.space/", {
			auth: {
				username: "guest",
				password: "welcome2qauto",
			},
		});
	});

	it("find countainer button", () => {
		cy.get("header .btn").should("have.length.gt", 0);
	});
	it("find footer button", () => {
		cy.get("#contactsSection").within(() => {
			cy.get("a").should("have.length.gt", 0);
		});
	});
});
