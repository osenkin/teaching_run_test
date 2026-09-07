import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "https://qauto.forstudy.space/",
		env: {
			authUsername: "guest",
			authPassword: "welcome2qauto",
		},
		reporter: "mochawesome",
		reporterOptions: {
			reportDir: "cypress/reports",
			overwrite: false,
			html: true,
			json: true,
		},
	},
});
