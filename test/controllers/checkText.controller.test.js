import { checkText } from "../../src/controllers/checkText.controller";
import { expect, jest } from "@jest/globals";
import BusinessLogic from "../../src/business-logic/index.js";
import { ServerError, BusinessError } from "../../src/helpers/error.helper";

describe("Controller: Check text unit test", () => {
	const businessError = new BusinessError("Business error", "business error");
	const serverError = new ServerError("Server error", "server error");

	const checkTextBusinessLogicStub = jest.spyOn(BusinessLogic, "checkText");

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

		checkTextBusinessLogicStub.mockReturnValue(true);

		await checkText(req, res);
		expect(res.send).toBeCalledWith(true);
		expect(res.status).toBeCalledWith(200);
		expect(checkTextBusinessLogicStub).toBeCalled();
	});

	it("[SUCCESS] Should return false when BusinessLogic.checkText return false", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		checkTextBusinessLogicStub.mockReturnValue(false);

		await checkText(req, res);
		expect(res.send).toBeCalledWith(false);
		expect(res.status).toBeCalledWith(200);
		expect(checkTextBusinessLogicStub).toBeCalled();
	});

	it("[ERROR] Should return a ServerError when checkText logic throw a ServerError", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		checkTextBusinessLogicStub.mockImplementation(() => {
			throw serverError;
		});

		await checkText(req, res);

		expect(res.status).toBeCalledWith(500);
		expect(res.send).toBeCalledWith({ error: serverError });
		expect(checkTextBusinessLogicStub).toBeCalled();
	});

	it("[ERROR] Should return a BusinessError when checkText logic throw a BusinessError", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		checkTextBusinessLogicStub.mockImplementation(() => {
			throw businessError;
		});

		await checkText(req, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.send).toBeCalledWith({ error: businessError });
		expect(checkTextBusinessLogicStub).toBeCalled();
	});
});
