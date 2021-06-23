# Brightspace Component Catalog

## Running

Development:
```
npm run start
```

Production:
```
npm run start:prod
```

## Testing

```shell
# lint & run headless unit tests
npm test

# unit tests only
npm run test:unit
```

## Visual Diff Testing

This repo uses the [@brightspace-ui/visual-diff utility](https://github.com/BrightspaceUI/visual-diff/) to compare current snapshots against a set of golden snapshots stored in source control.

The golden snapshots in source control must be updated by Github Actions.  If your PR's code changes result in visual differences, a draft PR with the new goldens will be automatically opened for you against your branch.

If you'd like to run the tests locally to help troubleshoot or develop new tests, you can use these commands:

```shell
# install dependencies locally
npm install esm mocha puppeteer @brightspace-ui/visual-diff --no-save
# run visual-diff tests
npx mocha './test/**/*.visual-diff.js' -t 10000 --require esm
# subset of visual-diff tests:
npx mocha './test/**/*.visual-diff.js' -t 10000 --require esm -g some-pattern
# update visual-diff goldens
npx mocha './test/**/*.visual-diff.js' -t 10000 --require esm --golden
```

## Requesting a Component

If the component you are interested in has not yet been created or requested, complete the ["Component - Request" issue template](https://github.com/BrightspaceUI/documentation/issues/new?assignees=&labels=Requested+Component&template=component-request.md&title=%3CComponent+Name%3E).

## Creating Documentation

[Adding a component](docs/adding-component.md)
