import { expect, test } from 'vitest';
import fromNow from './fromNow';

const SECOND = 1 * 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365.25;

test.each([
	{ interval: 30 * SECOND, result: 'less than a minute ago' },
	{ interval: 30 * MINUTE, result: '30 minutes ago' },
	{ interval: HOUR, result: 'an hour ago' },
	{ interval: HOUR + 30 * MINUTE, result: 'an hour ago' },
	{ interval: 2 * HOUR, result: '2 hours ago' },
	{ interval: 6 * HOUR, result: '6 hours ago' },
	{ interval: DAY, result: 'yesterday' },
	{ interval: DAY + 12 * HOUR, result: 'yesterday' },
	{ interval: 2 * DAY, result: '2 days ago' },
	{ interval: WEEK, result: 'a week ago' },
	{ interval: WEEK + 2 * DAY, result: 'a week ago' },
	{ interval: 3 * WEEK + 2 * DAY, result: '3 weeks ago' },
	{ interval: MONTH, result: 'a month ago' },
	{ interval: MONTH + 12 * DAY, result: 'a month ago' },
	{ interval: 2 * MONTH, result: '2 months ago' },
	{ interval: YEAR, result: 'a year ago' },
	{ interval: YEAR + 6 * MONTH, result: 'a year ago' },
	{ interval: 2 * YEAR + MONTH, result: '2 years ago' },
	{ interval: 20 * YEAR, result: '20 years ago' }
])('$result', ({ interval, result }) => {
	const now = Date.now();
	const then = new Date(now - interval);
	expect(fromNow(then)).toBe(result);
});
