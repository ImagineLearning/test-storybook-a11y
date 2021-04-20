
/**
 * Run axe accessibility tests with jest-axe on each Storybook story matching the specified glob pattern.
 * 
 * @param storyGlob - Glob pattern for matching story files
 */
declare function testStorybookA11y(storyGlob?: string = '**/*.stories.@(js|jsx|ts|tsx)'): void;
export default testStorybookA11y;
