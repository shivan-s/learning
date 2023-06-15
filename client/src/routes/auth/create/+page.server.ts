import type { Actions, PageServerLoad } from './$types';
import connection from '$lib/db';
import { z } from 'zod';
import { error } from '@sveltejs/kit';

const LearningSchema = z.object({
	learningId: z.coerce.number(),
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
		const result = LearningSchema.omit({ learningId: true }).safeParse({
			topicId,
			content
		});
		if (!result.success) {
			const error = result.error.flatten().fieldErrors;
			return {
				success: false,
				error,
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
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content',
				eb
					.selectFrom(['topics', 'learnings'])
					.whereRef('learnings.topic_id', '=', 'topics.id')
					.select('topics.name as topic')
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
	update: async ({ request, platform }) => {
		const formData = await request.formData();
		const learningId = formData.get('learningId');
		const topicId = formData.get('topicId');
		const content = formData.get('content');
		const result = LearningSchema.safeParse({
			learningId,
			topicId,
			content
		});
		if (!result.success) {
			return {
				success: false,
				error: JSON.stringify(error),
				topicId,
				content
			};
		}
		const db = connection(platform?.env?.DB);
		const updatedLearning = await db
			.updateTable('learnings')
			.set(({ selectFrom }) => ({
				topic_id: selectFrom('topics')
					.where('id', '=', result.data.topicId)
					.select(['id'])
					.limit(1),
				content: result.data.content
			}))
			.where('learnings.id', '=', result.data.learningId)
			.returning((eb) => [
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content',
				eb
					.selectFrom(['topics', 'learnings'])
					.whereRef('learnings.topic_id', '=', 'topics.id')
					.select('topics.name as topic')
					.limit(1)
			])
			.executeTakeFirstOrThrow();
		return {
			sucess: true,
			updatedLearning,
			topicId,
			content
		};
	},
	delete: async ({ request, platform }) => {
		const formData = await request.formData();
		const learningId = formData.get('learningId');
		const result = LearningSchema.pick({ learningId: true }).safeParse({ learningId });
		if (!result.success) {
			return {
				success: false,
				error: JSON.stringify(result.error),
				learningId
			};
		}
		const db = connection(platform?.env?.DB);
		const now = z.coerce.string().parse(new Date(Date.now()));
		const deletedLearning = await db
			.updateTable('learnings')
			.set({ deleted_at: now })
			.where('learnings.id', '=', result.data.learningId)
			.returning((eb) => [
				'learnings.id as learningId',
				'learnings.created_at as createdAt',
				'learnings.content as content',
				eb
					.selectFrom(['topics', 'learnings'])
					.whereRef('learnings.topic_id', '=', 'topics.id')
					.select('topics.name as topic')
					.limit(1)
			])
			.executeTakeFirstOrThrow();
		return {
			success: true,
			deletedLearning,
			learningId
		};
	},
	undelete: async ({ request, platform }) => {
		const formData = await request.formData();
		const learningId = formData.get('learningId');
		const result = LearningSchema.pick({ learningId: true }).safeParse({ learningId });
		if (!result.success) {
			return {
				success: false,
				error: JSON.stringify(result.error),
				learningId
			};
		}
		const db = connection(platform?.env?.DB);
		const undeletedLearning = await db
			.updateTable('learnings')
			.set({ deleted_at: null })
			.where('learnings.id', '=', result.data.learningId)
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
			undeletedLearning,
			learningId
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
		const learning = await db
			.selectFrom('learnings')
			.where('learnings.deleted_at', 'is', null)
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
		return { success: true, requestEditLearning: learning };
	},
	resetEdit: async () => {
		return { success: true, requestEditLearning: null };
	}
} satisfies Actions;

export const load = (async ({ platform }) => {
	const db = connection(platform?.env?.DB);
	const topics = await db.selectFrom('topics').select(['name', 'id']).execute();
	const learnings = await db
		.selectFrom('learnings')
		.innerJoin('topics', 'learnings.topic_id', 'topics.id')
		.select([
			'learnings.id as learningId',
			'learnings.created_at as createdAt',
			'learnings.updated_at as updatedAt',
			'learnings.deleted_at as deletedAt',
			'learnings.content as content',
			'topics.name as topic',
			'topics.id as topicId'
		])
		.orderBy('createdAt', 'desc')
		.execute();
	return {
		topics,
		learnings,
		totalChar: 255
	};
}) satisfies PageServerLoad;
