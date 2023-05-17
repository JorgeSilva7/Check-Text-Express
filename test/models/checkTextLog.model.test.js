import { expect, jest } from "@jest/globals";
import CheckTextModel from "../../src/models/checkTextLog.model";
import { mongoConnect, mongoDisconnect } from "../../src/config/mongo";

describe("Models: Check text model unit test", () => {
	const checkTextModelStub = jest.spyOn(CheckTextModel, "create");

	beforeAll(async () => {
		await mongoConnect("mongodb://localhost:27017/checktext-api-test");
	});

	afterAll(async () => {
		await mongoDisconnect();
	});

	beforeEach(async () => {
		await CheckTextModel.deleteMany({});
	});

	it("[SUCCESS] Create check text with stub", async () => {
		checkTextModelStub.mockReturnValue();
		CheckTextModel.saveLog({ type: "a", text: "a" });

		expect(checkTextModelStub).toBeCalled();
	});

	it("[SUCCESS] Create check text successful", async () => {
		checkTextModelStub.mockRestore();
		CheckTextModel.saveLog({ type: "asd", text: "texto" });

		const result = await CheckTextModel.findOne({
			type: "asd",
			text: "texto",
		}).exec();
		expect(result).not.toBeNull();
	});

	it("[SUCCESS] Check text doesnt exists", async () => {
		const result = await CheckTextModel.findOne({
			type: "a",
			text: "t",
		}).exec();
		expect(result).toBeNull();
	});
});
