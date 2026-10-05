import { defineConfig } from "cypress";

export default defineConfig({
	allowCypressEnv: true,
	e2e: {
		viewportWidth: 1920,
		viewportHeight: 1080,
		chromeWebSecurity: false,
		video: false,
		screenshotOnRunFailure: true,

		setupNodeEvents(on, config) {
			// registerMochawesome(on);
			return config;
		},

		defaultCommandTimeout: 8000,
		pageLoadTimeout: 60000,
		requestTimeout: 10000,
		responseTimeout: 30000,
	},
});
