// @ts-check
/* global expect, describe, test */
/** @typedef {import('@storybook/react').Story} Story */

const { toBeEmptyDOMElement } = require('@testing-library/jest-dom/matchers');
const { render, waitFor } = require('@testing-library/react');
const glob = require('glob');
const { axe, toHaveNoViolations } = require('jest-axe');
const { createElement } = require('react');
const { getStoryTestCases } = require('./utils');

module.exports = testStorybookA11y;

/**
 *
 * @param {string} [storyGlob]
 * @returns {void}
 */
function testStorybookA11y(storyGlob) {
	// Get stories to test
	const search = storyGlob || '**/*.stories.@(js|jsx|ts|tsx)';
	const files = glob.sync(search, { absolute: true, ignore: ['**/node_modules/**/*'] });
	const cases = getStoryTestCases(files);

	// Configure Jest custom matchers
	expect.extend({ toBeEmptyDOMElement, ...toHaveNoViolations });

	// Run tests
	describe.each(cases)('%s a11y', (_, module) => {
		// eslint-disable-next-line
		const storyModule = require(module);

		/** @type {[string, Story, any][]} */
		const stories = Object.keys(storyModule)
			.filter((key) => key !== 'default')
			.map((key) => [key, storyModule[key], storyModule[key].args]);

		test.each(stories)('%s story should have no a11y violations', async (__, story, props) => {
			const { container } = render(createElement(story, props));
			await waitFor(
				async () => {
					const results = await axe(container);
					expect(results).toHaveNoViolations();
				},
				{ timeout: 5000 }
			);
		});
	});
}
