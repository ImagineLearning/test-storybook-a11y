// @ts-check
/* global expect, describe, test */
/** @typedef {import('react').FunctionComponentElement<any>} FunctionComponentElement */
/** @typedef {import('@storybook/react').Story} Story */
/** @typedef {import('./index').TestOptions} TestOptions */
/** @typedef {((story: (() => FunctionComponentElement)) => FunctionComponentElement)} StoryDecorator */

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
 * @param {TestOptions} [options]
 * @returns {void}
 */
function testStorybookA11y(storyGlob, options) {
	const { timeout, axeOptions } = options || { timeout: 1000 };

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

		// Get story decorators, if any
		/** @type {{decorators: StoryDecorator[]}} */
		const { decorators } = storyModule.default || {};

		/** @type {[string, Story, any][]} */
		const stories = Object.keys(storyModule)
			.filter((key) => key !== 'default')
			.map((key) => [key, storyModule[key], storyModule[key].args]);

		test.each(stories)('%s story should have no a11y violations', async (__, story, props) => {
			const { container } = renderWithDecorators(story, props, decorators);

			// Wait for story to render completely
			await waitFor(
				() => {
					expect(container).not.toBeEmptyDOMElement();
				},
				{ timeout }
			);

			// Test for a11y violations
			const results = await axe(container, axeOptions);
			expect(results).toHaveNoViolations();
		});
	});
}

/**
 *
 * @param {Story} story
 * @param {any} props
 * @param {StoryDecorator[]} [decorators]
 */
function renderWithDecorators(story, props, decorators) {
	const decorated = (decorators || []).reverse().reduce(
		(elem, decorator) => () => decorator(elem),
		() => createElement(story, props)
	);
	return render(decorated());
}
