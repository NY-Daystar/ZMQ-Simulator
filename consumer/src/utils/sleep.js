/**
 * Block code execution
 * @param {*} ms time to wait in milliseconds
 * @returns
 */
module.exports = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
