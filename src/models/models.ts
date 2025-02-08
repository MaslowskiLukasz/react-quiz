export interface Category {
	id: number;
	name: string;
}

export interface Question {
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

export class QuestionPresentationModel {
	question: string = '';
	answers: string[] = [];

	constructor(response: Question) {
		this.question = response.question;
		const randomizedAnswers =
			[
				...response.incorrect_answers,
				response.correct_answer
			].sort(() => 0.5 - Math.random());
		this.answers = [...randomizedAnswers];
	}
}
