# @imaginelearning/test-storybook-a11y

Automatically run Jest accessibility tests on Storybook stories.

## Installation

This package is hosted through [GitHub Package Registry (GPR)](https://github.com/features/packages).
Currently, [GPR requires an access token](https://github.community/t/download-from-github-package-registry-without-authentication/14407) even if the package is publicly available.
Be sure you've properly [configured npm or Yarn with your personal access token](https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages) before installing this package.

Once your environment is properly configured, install the package with the following command:

```bash
npm i -D @imaginelearning/test-storybook-a11y

# or

yarn add -D @imaginelearning/test-storybook-a11y
```

It also requires the following peer dependencies:

- [jest](https://github.com/facebook/jest)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [react](https://github.com/facebook/react/)
- [@storybook/react](https://github.com/storybookjs/storybook/tree/master/app/react)
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)
- [@testing-library/react](https://github.com/testing-library/react-testing-library)

## Usage

This package exports a single default function. Import the function into a test file, then call it with a glob pattern for matching your Storybook story files.
It will automatically render each story from all matching story files, and test the rendered output with the [axe-core accessibility engine](https://github.com/dequelabs/axe-core) for accessibility violations.

```ts
// src/a11y.test.ts

import testStorybookA11y from '@imaginelearning/test-storybook-a11y';

testStorybookA11y('./**/*.stories.@(jsx|tsx)');
```

## Disclaimer

Using this package does not ensure comprehensive accessibility testing in your project.
It is a quick and simple way to add some level of automated accessibility testing by leveraging your existing Storybook stories.
Keep in mind that by default Jest uses [jsdom](https://github.com/jsdom/jsdom) to render your components, so while it _can_ help to identify structural issues, unless you're rendering styles in your unit tests it's not likely to identify style issues--such as improper color contrast.
