import { connect } from "mongoose";
import environment from "./environment.js";

const { MONGO_URI } = environment;

async function mongoConnect() {
	try {
		console.log("Connecting to mongo database...");
		await connect(MONGO_URI);
		console.log("Connected =)");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

export default mongoConnect;
