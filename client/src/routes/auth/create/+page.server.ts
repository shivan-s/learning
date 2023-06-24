import type { Actions, PageServerLoad } from './$types';
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
	create: async ({ request, locals }) => {
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
		const { learning } = locals.models;
		const newLearning = await learning.create({
			topicId: result.data.topicId,
			content: result.data.content
		});
		return {
			success: true,
			newLearning,
			topicId,
			content
		};
	},
	update: async ({ request, locals }) => {
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
		const { learning } = locals.models;
		const updatedLearning = await learning.update({
			learningId: result.data.learningId,
			content: result.data.content,
			topicId: result.data.topicId
		});
		return {
			sucess: true,
			updatedLearning,
			topicId,
			content
		};
	},
	delete: async ({ request, locals }) => {
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
		const { learning } = locals.models;
		const deletedLearning = await learning.delete({ learningId: result.data.learningId });
		return {
			success: true,
			deletedLearning,
			learningId
		};
	},
	undelete: async ({ request, locals }) => {
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
		const { learning } = locals.models;
		const undeletedLearning = learning.undelete({ learningId: result.data.learningId });
		return {
			success: true,
			undeletedLearning,
			learningId
		};
	},
	requestEdit: async ({ request, locals }) => {
		const formData = await request.formData();
		const result = z.coerce.number().safeParse(formData.get('learningId'));
		if (!result.success) {
			throw error(400, 'Invalid Id');
		}
		const { learning } = locals.models;
		const requestEditLearning = learning.getbyId(result.data);
		return { success: true, requestEditLearning };
	},
	resetEdit: async () => {
		return { success: true, requestEditLearning: null };
	}
} satisfies Actions;

export const load = (async ({ url, locals }) => {
	const { LIMIT } = locals;
	const q = url.searchParams.get('q');
	const topicFilter = url.searchParams.get('topic');
	const { topic, learning } = locals.models;
	const topics = topic.getAll();
	const learnings = learning.getAll({
		limit: LIMIT,
		q: null,
		topicFilter: null,
		cursor: null,
		deleted: true
	});
	return {
		q,
		topicId: topicFilter,
		topics,
		learnings,
		totalChar: 255
	};
}) satisfies PageServerLoad;
