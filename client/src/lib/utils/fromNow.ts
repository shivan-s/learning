export default function fromNow(date: Date) {
	const now = Date.now();
	const then = date.getTime();

	const interval = Math.floor((now - then) / 1000); // in seconds

	const SECOND = 1;
	const MINUTE = SECOND * 60;
	const HOUR = MINUTE * 60;
	const DAY = HOUR * 24;
	const WEEK = DAY * 7;
	const MONTH = DAY * 30;
	const YEAR = DAY * 365.25;

	if (interval < MINUTE) {
		return 'less than a minute ago';
	}
	if (interval < MINUTE * 2) {
		return 'a minute ago';
	}
	if (interval < HOUR) {
		return `${Math.floor(interval / MINUTE)} minutes ago`;
	}
	if (interval < HOUR * 2) {
		return 'an hour ago';
	}
	if (interval < DAY) {
		return `${Math.floor(interval / HOUR)} hours ago`;
	}
	if (interval < DAY * 2) {
		return 'yesterday';
	}
	if (interval < WEEK) {
		return `${Math.floor(interval / DAY)} days ago`;
	}
	if (interval < WEEK * 2) {
		return 'a week ago';
	}
	if (interval < MONTH) {
		return `${Math.floor(interval / WEEK)} weeks ago`;
	}
	if (interval < MONTH * 2) {
		return `a month ago`;
	}
	if (interval < YEAR) {
		return `${Math.floor(interval / MONTH)} months ago`;
	}
	if (interval < YEAR * 2) {
		return `a year ago`;
	}
	return `${Math.floor(interval / YEAR)} years ago`;
}
