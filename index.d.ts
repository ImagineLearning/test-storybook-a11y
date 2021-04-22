import { axe } from 'jest-axe';

export interface TestOptions {
	timeout?: number;
	axeOptions?: axe.RunOptions;
}

/**
 * Run axe accessibility tests with jest-axe on each Storybook story matching the specified glob pattern.
 *
 * @param storyGlob - Glob pattern for matching story files
 * @param options - Options for setting test timeout and axe configuration
 */
declare function testStorybookA11y(
	storyGlob?: string = '**/*.stories.@(js|jsx|ts|tsx)',
	options: TestOptions = { timeout: 1000 }
): void;
export default testStorybookA11y;
