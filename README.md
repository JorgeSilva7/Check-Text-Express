# Check Text API

## API for check some text with certain format

## Initialize and run dev

_Need a mongo database connection_

```
Set the environment variables in .env file:
- NODE_ENV: Environment (test: mock ON)
- PORT: running port number
- MONGO_URI: Mongo URI full format `mongodb://user:pass@host:port/databaseName`
```

```
npm i
npm run dev
```

## Tests

```
npm run test -> test without mocks
npm run test:mock -> test with mocks
npm run test:mock:unix -> test with mocks for unix (MAC, linux)
```

## Coverage

```
npm run coverage -> coverage without mocks
npm run coveraget:mock -> coverage with mocks
npm run coverage:mock:unix -> coverage with mocks for unix (MAC, linux)
```
