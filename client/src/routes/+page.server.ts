import type { PageServerLoad } from './$types';
import connection from '$lib/db';

export const load = (async ({ platform, url }) => {
	const q = url.searchParams.get('q') || '*';
	const db = connection(platform?.env?.DB);
	const topics = await db
		.selectFrom('topics')
		.where('deleted_at', 'is', null)
		.select(['name', 'id'])
		.execute();
	const learnings = await db
		.selectFrom('learnings')
		.where('learnings.deleted_at', 'is', null)
		/* .where(({ or, cmpr }) => or([cmpr('content', '=', q), cmpr('topic', '=', q)])) */
		.innerJoin('topics', 'learnings.topic_id', 'topics.id')
		.select([
			'learnings.created_at as createdAt',
			'learnings.updated_at as updatedAt',
			'learnings.content as content',
			'topics.name as topic'
		])
		.execute();
	return {
		topics,
		learnings
	};
}) satisfies PageServerLoad;

/* const learnings: Learning[] = [ */
/*   { */
/*     date: '2023-05-28', */
/*     topic: 'Flying', */
/*     learning: */
/*       'Learning about climbing and descending. Remember the pull the carb out when below 1300 RPMs!' */
/*   }, */
/*   { */
/*     date: '2023-05-28', */
/*     topic: 'Golf', */
/*     learning: */
/*       'Making good contact. Focus on reducing the wrist action. Practice but make sure you hit the ground.' */
/*   }, */
/*   { */
/*     date: '2023-05-28', */
/*     topic: 'Brazilian Jiu Jitsu', */
/*     learning: */
/*       "Fun roll. Maintain a good base. Do not stay on back. Try and antipate opponent's move and don't stop moving." */
/*   }, */
/*   { */
/*     date: '2023-05-29', */
/*     topic: 'Brazilian Jiu Jitsu', */
/*     learning: 'Learnt about deep half guard from mount and half guard.' */
/*   }, */
/*   { */
/*     date: '2023-05-29', */
/*     topic: 'Programming', */
/*     learning: */
/*       'The Alignment Problem: Reinforcement learning - incentivise for A but end up getting B. Deep Learning with Python: Gradient descent, backpropagation, overview. Rust: tui-rs' */
/*   } */
/* ]; */
