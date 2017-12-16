## Issues

- Report issues or feature requests on [GitHub Issues](https://github.com/formslider/jquery.formslider/issues).
- If reporting a bug, please add a [simplified example](http://sscce.org/).

## Pull requests
- Create a new topic branch for every separate change you make.
- Create a test case if you are fixing a bug or implementing an important feature.
- Make sure the build runs successfully.

## Development

### Tools
We use the following tools for development:
- [Karma](https://www.npmjs.com/package/karma) as test runner.
- [Jasmine](http://jasmine.github.io) for tests definitions.
- [NodeJS](http://nodejs.org/download/) required to run gulp.
- [Gulp](https://gulpjs.com/) for task management.

### Getting started
Install [NodeJS](http://nodejs.org/).  
Install globally gulp-cli using the following command:

    $ npm install -g gulp-cli bower

Browse to the project root directory and install the dependencies:

    $ npm install -d

To run the test:

    $ npm run test

To start a browser with the test configuration for browsing:

    $ npm run browse

To create a bundle:

    $ npm run bundle
