import checkText from "../../src/business-logic/checkText.logic.js";
import { expect, jest } from "@jest/globals";
import { BusinessError } from "../../src/helpers/error.helper.js";
import checkTextModel from "../../src/models/checkTextLog.model.js";
import("../../src/mocks/pokemon.mock.js"); // Enable mocks

describe("Business Logic: Check text unit test", () => {
	jest.spyOn(checkTextModel, "saveLog").mockReturnValue();

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
		}
	});

	it("[SUCCESS] Should return true when the text is a valid url", async () => {
		const input = {
			text: "www.google.cl",
			type: "url",
		};

		const result = await checkText(input);

		expect(result).toEqual(true);
	});

	it("[SUCCESS] Should return false when the text is a invalid url", async () => {
		const input = {
			text: "asdasd",
			type: "url",
		};

		const result = await checkText(input);

		expect(result).toBeFalsy();
	});

	it("[SUCCESS] Should return true when the text is a valid number", async () => {
		const input = {
			text: "2000",
			type: "number",
		};

		const result = await checkText(input);

		expect(result).toBeTruthy();
	});

	it("[SUCCESS] Should return false when the text is a invalid number", async () => {
		const input = {
			text: "asdasd",
			type: "number",
		};

		const result = await checkText(input);

		expect(result).toBeFalsy();
	});

	it("[SUCCESS] Should return true when the text is a valid pokemon name", async () => {
		const input = {
			text: "yes", // (mock success pokemon name. This test fails when u not use the mock)
			type: "pokemon",
		};

		const result = await checkText(input);

		expect(result).toBeTruthy();
	});

	it("[SUCCESS] Should return false when the text is a invalid pokemon name", async () => {
		const input = {
			text: "other",
			type: "pokemon",
		};

		const result = await checkText(input);

		expect(result).toBeFalsy();
	});
});
