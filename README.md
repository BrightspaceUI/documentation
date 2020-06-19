[![Dependabot badge](https://flat.badgen.net/dependabot/BrightspaceUI/documentation?icon=dependabot)](https://app.dependabot.com/)
[![Build status](https://travis-ci.com/BrightspaceUI/documentation.svg?branch=master)](https://travis-ci.com/BrightspaceUI/documentation)

# Brightspace Component Design System Documentation

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

To regenerate the `component-doc-details.js` file, which contains the custom-elements.json details from included components:

```shell
npm run generate-component-doc-details
```

### Running the demos

To start an [es-dev-server](https://open-wc.org/developing/es-dev-server.html) that hosts the demo page and tests:

```shell
npm start
```

To run the static production version of the application:

```shell
npm run start:build
```

### Linting

```shell
# eslint and lit-analyzer
npm run lint

# eslint only
npm run lint:eslint

# lit-analyzer only
npm run lint:lit
```
