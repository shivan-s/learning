declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env?: {
				DB: D1Database;
			};
		}
	}
}

export {};
