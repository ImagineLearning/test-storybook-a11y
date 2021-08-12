import { Args, Story, StoryContext } from '@storybook/react';
import { axe } from 'jest-axe';
import { FunctionComponentElement } from 'react';

export interface StoryDecorator {
	(story: Story, context?: Partial<StoryContext>): FunctionComponentElement;
}

export interface GlobalStoryConfig {
	decorators: StoryDecorator[];
	globals: Args;
}

export interface TestOptions {
	timeout?: number;
	axeOptions?: axe.RunOptions;
}

/**
 * Run axe accessibility tests with jest-axe on each Storybook story matching the specified glob pattern.
 *
 * @param storyGlob - Glob pattern for matching story files
 * @param globalConfig - Global args to pass to each story
 * @param options - Options for setting test timeout and axe configuration
 */
declare function testStorybookA11y(
	storyGlob?: string = '**/*.stories.@(js|jsx|ts|tsx)',
	globalConfig?: GlobalStoryConfig = {},
	options: TestOptions = { timeout: 1000 }
): void;
export default testStorybookA11y;
