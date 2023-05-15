import BusinessLogic from "../business-logic/index.js";
import { BusinessError } from "../helpers/error.helper.js";

/**
 * Validate input arguments (required only validation)
 * @param {object} arguments - Input arguments (type and text)
 */
function validateCheckText({ type, text }) {
	if (!type) {
		throw new BusinessError("Validation error", "type is required");
	}

	if (!text) {
		throw new BusinessError("Validation error", "text is required");
	}
}

/**
 * Check text controller
 * Validate input data, then check text with the BusinessLogic.checkText method and return http response
 * @param {Request} req - Request express http object
 * @param {Response} res - Response express http object
 */
function checkText(req, res) {
	const { text, type } = req.body;

	try {
		validateCheckText({ text, type });

		const result = BusinessLogic.checkText({ text, type });
		res.status(200).send(result);
	} catch (error) {
		const statusCode = error.statusCode ?? 500;
		res.status(statusCode).send({ error });
	}
}

export default checkText;
