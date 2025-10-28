
# Frontend Node

These docs introduce the Node.js and NPM setup used for managing frontend assets in this project.

These assets are built using Node.js tools and libraries, and the resulting files are then integrated into the Django application using a npm build script.

## Environment Setup

Before you start working with the frontend assets, ensure that your development environment is set up correctly. This includes having the necessary tools and dependencies installed.

Ensure you have Node.js (v16 or higher) and NPM installed. You can verify their installation with:

```bash
npm -v
```

### Installing Dependencies

After cloning the repository, navigate to the project directory (where the `package.json` file is located) and install the required NPM dependencies:

```bash
npm install
```

This command reads the `package.json` file and installs all listed dependencies into the `node_modules` directory.

## Preview Components in Storybook

To preview and interact with UI components in isolation, you can use Storybook. Start the Storybook server with:

```bash
npm run storybook
```

To view the Storybook interface, open your web browser and navigate to `http://localhost:6006`.

## Building all frontend assets

After making any changes to styles, scripts, or vendor files, you need to rebuild the assets to see the changes reflected in the Django application.

To build all styles, scripts, and vendor files, run:

```bash
npm run build
```

The above script performs all the following tasks, which are available as individual commands:

- **Build Expanded Styles**: `npm run styles:expanded` (builds expanded human-readable css files)
- **Build Minified Styles**: `npm run styles:minified` (builds minified css files, optimised for production)
- **Build Expanded Scripts**: `npm run scripts:expanded` (builds expanded human-readable javascript files)
- **Build Minified Scripts**: `npm run scripts:minified` (builds minified javascript files, optimised for production)
- **Build Vendor Files**: `npm run vendor` (bundles and optimises third-party libraries)

```bash
npm run styles:expanded
```

Built files are output to the `main/static/assets` directory, which is where the Django application expects to find them.

## Running Tests

To run the test suite using Vitest, execute:

```bash
npm run test
```

This will run all tests files (files with a `.test.js` extension) and display the results in the console.
The output will look like this:

``` > vitest run
 ✓ node/src/js/dataviz/radial-plot.test.js (46 tests) 345ms
...
 Test Files  1 passed (1)
      Tests  46 passed (46)
   Start at  10:50:02
   Duration  11.39s (transform 2.45s, setup 0ms, collect 8.93s, tests 345ms, environment 596ms, prepare 110ms)

 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

If any tests fail you will see a summary of the failures in the console output. See example below:

``` > vitest run
 FAIL  node/src/js/dataviz/radial-plot.test.js > RadialBarChart > Plot Offset > should apply custom plot Y offset
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

...

 Test Files  1 failed (1)
      Tests  1 failed | 45 passed (46)
   Start at  10:59:02
   Duration  803ms

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit

```

If this occurs you will need to investigate the test failures and fix any issues in the code or tests before re-running the test suite.
