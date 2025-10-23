
# Frontend Node

These docs introduce the Node.js and NPM setup used for managing frontend assets in this project.

These assets are built using Node.js tools and libraries, and the resulting files are then integrated into the Django application.

## Working with NPM

This project includes an NPM-based setup for managing front-end assets like styles, scripts, and other resources. The `package.json` file contains predefined scripts to help with building and managing assets. You don't need to run these NPM commands if you are developing the Django app locally. You should only run these commands when needed, for example if you are changing javascript dependencies or modifying SCSS files.

### Prerequisites

Ensure you have Node.js (v16 or higher) and NPM installed. You can verify their installation with:

```bash
npm -v
```

### Installing Dependencies

After cloning the repository, navigate to the project directory and install the required NPM dependencies:

```bash
npm install
```

### Building all frontend assets

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
