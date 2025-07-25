import * as fmtNumber from './number';
import * as fmtDate from './date.js';

export function createFormatter() {
	return {
		...fmtNumber,
		...fmtDate,
	}
}