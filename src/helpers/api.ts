import { Category, Question, QuestionPresentationModel } from "../models/models";

const BASE_URL = `https://opentdb.com/`;

export const fetchCategories = async (): Promise<Category[]> => {
	const response = await fetch(`${BASE_URL}/api_category.php`);
	const data = await response.json();
	return data.trivia_categories;
};

export const fetchQuestions = async (questionsParams: string): Promise<QuestionPresentationModel[]> => {
	try {
		const response = await fetch(`${BASE_URL}/${questionsParams}`);
		const data = await response.json();
		const questionsPM = data.results.map((item: Question) => new QuestionPresentationModel(item));
		return questionsPM;
	} catch {
		throw new Error('something is no yes');
	}
};
