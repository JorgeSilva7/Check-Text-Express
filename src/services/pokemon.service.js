import axios from "axios";
import config from "../config/environment.js";

const { BASE_URL, ENDPOINTS } = config.POKEMON_SERVICE;

function findPokemonByName(name) {
	const url = `${BASE_URL}${ENDPOINTS.getPokemon(name)}`;

	return axios
		.get(url)
		.then(() => {
			return true;
		})
		.catch((error) => {
			if (error.response.status === 404) {
				return false;
			}
			throw error;
		});
}

export { findPokemonByName };
