import { defineConfig } from "cypress";
import registerMochawesome from "cypress-mochawesome-reporter/plugin.js";

export default defineConfig({
	allowCypressEnv: true,
	reporter: "cypress-mochawesome-reporter",
	reporterOptions: {
		charts: true,
		reportPageTitle: "QAuto Test Report",
		embeddedScreenshots: true,
		inlineAssets: true,
		saveAllAttempts: false,
	},

	e2e: {
		viewportWidth: 1920,
		viewportHeight: 1080,
		chromeWebSecurity: false,
		video: false,
		screenshotOnRunFailure: true,

		setupNodeEvents(on, config) {
			registerMochawesome(on);
			return config;
		},

		defaultCommandTimeout: 8000,
		pageLoadTimeout: 60000,
		requestTimeout: 10000,
		responseTimeout: 30000,
	},
});
