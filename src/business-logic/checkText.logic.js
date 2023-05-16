import { BusinessError } from "../helpers/error.helper.js";

/**
 * Check the text depending on the type
 * @param {string} args.text - Input text to check
 * @param {string} args.type - Type of text to validate
 * @returns {boolean}
 */
function checkText({ text, type }) {
	const upperType = type.toUpperCase();

	const typeFuncion = selector[upperType];

	if (!typeFuncion) {
		throw new BusinessError("type error", "type is not available");
	}

	return selector[upperType](text);
}

/**
 * Check if the input text is a valid URL string
 * @param {string} text - Input text to check
 * @returns {boolean}
 */
function checkURL(text) {
	const pattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // fragment locator
	return !!pattern.test(text);
}

/**
 * Check if the input text is a valid Number
 * @param {string} text - Input text to check
 * @returns {boolean}
 */
function checkNumber(text) {
	return !isNaN(text) && !isNaN(parseFloat(text));
}

/**
 * Function selector (like switch but more pretty ✨)
 */
const selector = {
	URL: checkURL,
	NUMBER: checkNumber,
};

export default checkText;