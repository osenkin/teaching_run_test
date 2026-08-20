const { defineConfig } = require("cypress");

module.exports = defineConfig({
	allowCypressEnv: false,

	e2e: {
		baseUrl: "https://example.cypress.io",
		viewportWidth: 1920,
		viewportHeight: 1080,
		chromeWebSecurity: false,
		video: false,
		screenshotOnRunFailure: true,
		setupNodeEvents() {
			// implement node event listeners here
		},
		defaultCommandTimeout: 8000,
		pageLoadTimeout: 60000,
		requestTimeout: 10000,
		responseTimeout: 30000,
	},
});
