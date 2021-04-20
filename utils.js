// @ts-check

const { sep } = require('path');

/**
 * @param {string[]} files
 * @returns {[string, string][]}
 **/
function getStoryTestCases(files) {
	return files.map((file) => {
		const start = file.lastIndexOf(sep) + 1;
		const module = file.substring(start).replace(/\.(story|stories)?\.[jt]sx?$/, '');
		return [module, file];
	});
}

module.exports = {
	getStoryTestCases,
};
