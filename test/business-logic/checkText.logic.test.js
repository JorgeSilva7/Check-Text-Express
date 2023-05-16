import checkText from "../../src/business-logic/checkText.logic.js";
import { expect, jest } from "@jest/globals";
import { BusinessError } from "../../src/helpers/error.helper.js";
import CheckTextModel from "../../src/models/checkTextLog.model.js";

describe("Business Logic: Check text unit test", () => {
	const checkTextModelStub = jest.spyOn(CheckTextModel, "saveLog");

	beforeEach(() => {
		checkTextModelStub.mockImplementation(() => {});
	});

	it("[ERROR] When the type doesnt exists in the selector should throw error", async () => {
		const input = {
			text: "",
			type: "boolean",
		};

		try {
			await checkText(input);
		} catch (error) {
			expect(error.msg).toEqual("type is not available");
			expect(error).toBeInstanceOf(BusinessError);
			expect(error.name).toEqual("type error");
			expect(checkTextModelStub).not.toBeCalled();
		}
	});

	it("[SUCCESS] Should return true when the text is a valid url", async () => {
		const input = {
			text: "www.google.cl",
			type: "url",
		};

		const result = await checkText(input);

		expect(result).toEqual(true);
		expect(checkTextModelStub).toBeCalled();
	});

	it("[SUCCESS] Should return false when the text is a invalid url", async () => {
		const input = {
			text: "asdasd",
			type: "url",
		};
		const result = await checkText(input);

		expect(result).toBeFalsy();
		expect(checkTextModelStub).toBeCalled();
	});

	it("[SUCCESS] Should return true when the text is a valid number", async () => {
		const input = {
			text: "2000",
			type: "number",
		};
		const result = await checkText(input);

		expect(result).toBeTruthy();
		expect(checkTextModelStub).toBeCalled();
	});

	it("[SUCCESS] Should return false when the text is a invalid number", async () => {
		const input = {
			text: "asdasd",
			type: "number",
		};
		const result = await checkText(input);

		expect(result).toBeFalsy();
		expect(checkTextModelStub).toBeCalled();
	});
});
