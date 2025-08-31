/**
 * Block code execution
 * @param {number} ms time to wait in milliseconds
 * @returns
 */
export default (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
