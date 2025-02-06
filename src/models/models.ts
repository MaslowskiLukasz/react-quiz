export interface Category {
	id: number;
	name: string;
}

export interface Question {
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}
