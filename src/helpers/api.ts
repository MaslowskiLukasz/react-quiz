import { Category, Question } from "../models/models";

const baseUrl = `https://opentdb.com/`;

export const fetchCategories = async (): Promise<Category[]> => {
	const response = await fetch(`${baseUrl}/api_category.php`);
	const data = await response.json();
	return data.trivia_categories;
};

export const fetchQuestions = async (questionsParams: string): Promise<Question[]> => {
	const response = await fetch(`${baseUrl}/${questionsParams}`);
	const data = await response.json();
	return data.results;
};
