import express from "express";
import checkTextRouter from "./routers/checkText.router.js";

const PORT = 4000;

const server = express();

server.use(express.json());

server.use("/check_text", checkTextRouter);

server.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
