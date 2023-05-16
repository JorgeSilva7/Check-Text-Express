import { checkText } from "../../src/controllers/checkText.controller";
import { expect, jest } from "@jest/globals";
import BusinessLogic from "../../src/business-logic/index.js";
import { ServerError, BusinessError } from "../../src/helpers/error.helper";

describe("Controller: Check text unit test", () => {
	const businessError = new BusinessError("Business error", "business error");
	const serverError = new ServerError("Server error", "server error");

	BusinessLogic.checkText = jest.fn();

	const res = {
		status: jest.fn().mockReturnThis(),
		send: jest.fn(),
	};

	it("[ERROR] When the type doesnt exists in the body throw error", () => {
		const req = {
			body: {
				text: "text",
			},
		};

		checkText(req, res);
		expect(res.status).toBeCalledWith(400);
		expect(res.send).toBeCalledWith({ error: businessError });
	});

	it("[ERROR] When the text doesnt exists in the body throw error", () => {
		const req = {
			body: {
				type: "type",
			},
		};

		checkText(req, res);
		expect(res.status).toBeCalledWith(400);
		expect(res.send).toBeCalledWith({ error: businessError });
	});

	it("[ERROR] When the text doesnt exists in the body throw error with status code 500", () => {
		const req = {
			body: {
				type: "type",
			},
		};

		checkText(req, res);
		expect(res.status).toBeCalledWith(400);
		expect(res.send).toBeCalledWith({ error: businessError });
	});

	it("[SUCCESS] Should return true when BusinessLogic.checkText return true", () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		BusinessLogic.checkText.mockReturnValue(true);

		checkText(req, res);
		expect(res.send).toBeCalledWith(true);
		expect(res.status).toBeCalledWith(200);
	});

	it("[SUCCESS] Should return false when BusinessLogic.checkText return false", () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		BusinessLogic.checkText.mockReturnValue(false);

		checkText(req, res);
		expect(res.send).toBeCalledWith(false);
		expect(res.status).toBeCalledWith(200);
	});

	it("[ERROR] Should return a ServerError when checkText logic throw a ServerError", () => {
		BusinessLogic.checkText.mockImplementation(() => {
			throw serverError;
		});

		const req = { body: { text: "text", type: "type" } };

		checkText(req, res);

		expect(res.status).toBeCalledWith(500);
		expect(res.send).toBeCalledWith({ error: serverError });
	});

	it("[ERROR] Should return a BusinessError when checkText logic throw a BusinessError", () => {
		BusinessLogic.checkText.mockImplementation(() => {
			throw businessError;
		});

		const req = { body: { text: "text", type: "type" } };

		checkText(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.send).toBeCalledWith({ error: businessError });
	});
});
