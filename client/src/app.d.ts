declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			LIMIT: number;
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
