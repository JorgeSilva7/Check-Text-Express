import checkText from "../../src/business-logic/checkText.logic.js";
import { expect } from "@jest/globals";
import { BusinessError } from "../../src/helpers/error.helper.js";

describe("Business Logic: Check text unit test", () => {
	it("[ERROR] When the type doesnt exists in the selector should throw error", () => {
		const input = {
			text: "",
			type: "boolean",
		};

		try {
			checkText(input);
		} catch (error) {
			expect(error.msg).toEqual("type is not available");
			expect(error).toBeInstanceOf(BusinessError);
			expect(error.name).toEqual("type error");
		}
	});

	it("[SUCCESS] Should return true when the text is a valid url", () => {
		const input = {
			text: "www.google.cl",
			type: "url",
		};
		const result = checkText(input);

		expect(result).toEqual(true);
	});

	it("[SUCCESS] Should return false when the text is a invalid url", () => {
		const input = {
			text: "asdasd",
			type: "url",
		};
		const result = checkText(input);

		expect(result).toBeFalsy();
	});

	it("[SUCCESS] Should return true when the text is a valid number", () => {
		const input = {
			text: "2000",
			type: "number",
		};
		const result = checkText(input);

		expect(result).toBeTruthy();
	});

	it("[SUCCESS] Should return false when the text is a invalid number", () => {
		const input = {
			text: "asdasd",
			type: "number",
		};
		const result = checkText(input);

		expect(result).toBeFalsy();
	});
});
