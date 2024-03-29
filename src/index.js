import { config } from "dotenv";
config();

import express from "express";
import checkTextRouter from "./routers/checkText.router.js";
import environment from "./config/environment.js";
import { mongoConnect } from "./config/mongo.js";

const { PORT, NODE_ENV } = environment;

const server = express();

server.use(express.json());

server.use("/check_text", checkTextRouter);

function setupMockups() {
	if (NODE_ENV === "development") {
		import("./mocks/pokemon.mock.js");
	}
}

async function startServer() {
	await mongoConnect();

	setupMockups();

	server.listen(PORT, () => {
		console.log(`Server running on ${PORT}`);
	});
}

startServer();
