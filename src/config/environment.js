const enviornment = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: process.env.PORT || 4000,
	MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/checktext-api",
	POKEMON_SERVICE: {
		BASE_URL: "https://pokeapi.co/api/v2",
		ENDPOINTS: {
			getPokemon: (name) => (name ? `/pokemon/${name}` : "/pokemon/"),
		},
	},
};

export default enviornment;
