import { Category, Question, QuestionPresentationModel } from "../models/models";

const BASE_URL = `https://opentdb.com/`;

export const fetchCategories = async (): Promise<Category[]> => {
	try {
		const response = await fetch(`${BASE_URL}/api_category.php`);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const data = await response.json();
		return data.trivia_categories;
	} catch (error) {
		throw error;
	}
};

export const fetchQuestions = async (questionsParams: string): Promise<QuestionPresentationModel[]> => {
	try {
		const response = await fetch(`${BASE_URL}/${questionsParams}`);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const data = await response.json();
		const questionsPM = data.results.map((item: Question) => new QuestionPresentationModel(item));
		return questionsPM;
	} catch (error) {
		throw error;
	}
};
