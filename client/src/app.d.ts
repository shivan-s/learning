import { Learning, Topic } from '$lib/db';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			LIMIT: number;
			models: {
				learning: Learning;
				topic: Topic;
			};
		}
		// interface PageData {}
		interface Platform {
			env?: {
				DB: D1Database;
			};
		}
	}
}

export {};
