import { decodeText } from "../helpers/decode";

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
		this.text = decodeText(text);
		this.isCorrect = isCorrect;
	}
}

export class QuestionPresentationModel {
	question: string = '';
	answers: AnswerPresentationModel[] = [];

	constructor(response: Question) {
		this.question = decodeText(response.question);
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

export interface SelectAnswerContextType {
	questions: QuestionPresentationModel[];
	setSelected: (question: number, answer: number) => void;
	selectedAnswers: number[];
	maxQuestions: number;
}

export type State = 'start' | 'loading' | 'quiz' | 'results' | 'error';
