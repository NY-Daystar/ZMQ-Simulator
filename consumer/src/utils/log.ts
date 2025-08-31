import moment from 'moment';

/** Function to show output console params with a prefix time
@param {string} param parameter to log
*/
export default (param: string) => {
	console.info(`[${moment().format('YYYY-MM-DD HH:mm:ss [UTC]Z')}] ${param}`);
};
