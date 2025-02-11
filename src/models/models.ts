export interface Category {
	id: number;
	name: string;
}

export interface Question {
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

export class AnswerPresentationModel {
	text: string = '';
	isCorrect: boolean = false;

	constructor(text: string, isCorrect: boolean) {
		this.text = text;
		this.isCorrect = isCorrect;
	}
}

export class QuestionPresentationModel {
	question: string = '';
	answers: AnswerPresentationModel[] = [];

	constructor(response: Question) {
		this.question = response.question;
		const correct = new AnswerPresentationModel(response.correct_answer, true);
		const incorrect = response.incorrect_answers.map((item) => new AnswerPresentationModel(item, false));
		const randomizedAnswers =
			[
				...incorrect,
				correct
			]
				.sort(() => 0.5 - Math.random());
		this.answers = [...randomizedAnswers];
	}
}
