import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../config/environment";

const { BASE_URL, ENDPOINTS } = config.POKEMON_SERVICE;

const mock = new MockAdapter(axios);

// Get Pokemon URL from config ("https://pokeapi.co/api/v2"/pokemon/)
const getPokemonURL = `${BASE_URL}${ENDPOINTS.getPokemon()}`;

const arrayOfPokemons = ["pokemon", "yes", "raichu", "charmander"];

//Mock for getPokemonURL 200 success (true)
arrayOfPokemons.forEach((pokemon) =>
	mock.onGet(`${getPokemonURL}${pokemon}`).reply(200, {})
);

//Any other requests returns 404 because they aren't mocked

export default mock;
