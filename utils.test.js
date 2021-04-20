// @ts-check

const { getStoryTestCases } = require('./utils');

jest.mock('path', () => ({
	sep: '/',
}));

describe('utils modules', () => {
	describe('getStoryTestCases(..)', () => {
		it('extracts module names', () => {
			const cases = getStoryTestCases([
				'rootDir/file1.stories.tsx',
				'rootDir/dirOne/file2.story.tsx',
				'rootDir/dirOne/dirThree/file4.story.jsx',
				'rootDir/dirTwo/file3.stories.jsx',
			]).map(([module]) => module);
			expect(cases).toEqual(['file1', 'file2', 'file4', 'file3']);
		});
	});
});
