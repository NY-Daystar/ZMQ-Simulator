import moment from 'moment';
import fs from 'fs';

/** Function to show output console params with a prefix time
@param {string} param parameter to log
*/
export const log = (param: string) => {
	console.info(`[${moment().format('YYYY-MM-DD HH:mm:ss [UTC]Z')}] ${param}`);
};

/**
 * Block code execution
 * @param {number} ms time to wait in milliseconds
 * @returns
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isFileExists = (path: string) => fs.existsSync(path);

export const readFile = (path: string): string => fs.readFileSync(path).toString();
