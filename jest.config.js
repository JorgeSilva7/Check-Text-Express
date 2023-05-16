module.exports = {
	transform: {
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	collectCoverageFrom: ["./src/**/*.js"],
	coveragePathIgnorePatterns: ["./src/routers/", "./src/index.js"],
	coverageThreshold: {
		global: {
			lines: 90,
		},
	},
};
