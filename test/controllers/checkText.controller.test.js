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

	it("[ERROR] When the type doesnt exists in the body throw error", async () => {
		const req = {
			body: {
				text: "text",
			},
		};

		await checkText(req, res);
		expect(res.status).toBeCalledWith(400);
		expect(res.send).toBeCalledWith({ error: businessError });
	});

	it("[ERROR] When the text doesnt exists in the body throw error", async () => {
		const req = {
			body: {
				type: "type",
			},
		};

		await checkText(req, res);
		expect(res.status).toBeCalledWith(400);
		expect(res.send).toBeCalledWith({ error: businessError });
	});

	it("[SUCCESS] Should return true when BusinessLogic.checkText return true", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		BusinessLogic.checkText = jest.fn().mockReturnValue(true);

		await checkText(req, res);
		expect(res.send).toBeCalledWith(true);
		expect(res.status).toBeCalledWith(200);
	});

	it("[SUCCESS] Should return false when BusinessLogic.checkText return false", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		BusinessLogic.checkText.mockReturnValue(false);

		await checkText(req, res);
		expect(res.send).toBeCalledWith(false);
		expect(res.status).toBeCalledWith(200);
	});

	it("[ERROR] Should return a ServerError when checkText logic throw a ServerError", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		BusinessLogic.checkText.mockImplementation(() => {
			throw serverError;
		});

		await checkText(req, res);

		expect(res.status).toBeCalledWith(500);
		expect(res.send).toBeCalledWith({ error: serverError });
	});

	it("[ERROR] Should return a BusinessError when checkText logic throw a BusinessError", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		BusinessLogic.checkText.mockImplementation(() => {
			throw businessError;
		});

		await checkText(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.send).toBeCalledWith({ error: businessError });
	});
});
