import type { Actions, PageServerLoad } from './$types';
import connection from '$lib/db';
import { z } from 'zod';
import { error } from '@sveltejs/kit';

const CreateSchema = z.object({
	topicId: z.coerce.number(),
	content: z
		.string({ required_error: 'Required field' })
		.trim()
		.max(255, { message: 'Must be under 255 characters' })
		.min(3, { message: 'Must be greater than 3 characters' })
});

export const actions = {
	create: async ({ request, platform }) => {
		const formData = await request.formData();
		const topicId = formData.get('topicId');
		const content = formData.get('content');
		const result = CreateSchema.safeParse({
			topicId,
			content
		});
		if (!result.success) {
			return {
				success: false,
				error: JSON.stringify(result.error),
				topicId,
				content
			};
		}
		const db = connection(platform?.env?.DB);
		const newLearning = await db
			.insertInto('learnings')
			.values(({ selectFrom }) => ({
				topic_id: selectFrom('topics')
					.where('id', '=', result.data.topicId)
					.select(['id'])
					.limit(1),
				content: result.data.content
			}))
			.returning((eb) => [
				'id as learningId',
				'created_at as createdAt',
				'content as content',
				eb
					.selectFrom(['topics', 'learnings'])
					.whereRef('learnings.topic_id', '=', 'topics.id')
					.select('name as topic')
					.limit(1)
			])
			.executeTakeFirstOrThrow();
		return {
			success: true,
			newLearning,
			topicId,
			content
		};
	},
	requestEdit: async ({ request, platform }) => {
		const db = connection(platform?.env?.DB);
		const formData = await request.formData();
		const result = z.coerce.number().safeParse(formData.get('learningId'));
		if (!result.success) {
			throw error(400, 'Invalid Id');
		}
		const learningId = result.data;
		const learning = db
			.selectFrom('learnings')
			.where('deleted_at', 'is', null)
			.where('learnings.id', '=', learningId)
			.innerJoin('topics', 'learnings.topic_id', 'topics.id')
			.select([
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.updated_at as updatedAt',
				'learnings.content as content',
				'topics.name as topic'
			])
			.executeTakeFirstOrThrow();
	}
} satisfies Actions;

export const load = (async ({ platform }) => {
	const db = connection(platform?.env?.DB);
	const topics = await db
		.selectFrom('topics')
		.where('deleted_at', 'is', null)
		.select(['name', 'id'])
		.execute();
	const learnings = await db
		.selectFrom('learnings')
		.where('learnings.deleted_at', 'is', null)
		.innerJoin('topics', 'learnings.topic_id', 'topics.id')
		.select([
			'learnings.id as learningId',
			'learnings.created_at as createdAt',
			'learnings.updated_at as updatedAt',
			'learnings.content as content',
			'topics.name as topic'
		])
		.orderBy('createdAt', 'desc')
		.execute();
	return {
		topics,
		learnings
	};
}) satisfies PageServerLoad;
