export type QuestionType = {
  title: string;
  answers: AnswerInterface[];
  randomiseOrder: () => void;
  allCorrect: () => boolean;
  getNumberCorrect: () => number;
};

export interface AnswerInterface {
  options: string[];
  selectAnswer: (index: number) => void;
  isCorrect: () => boolean;
  getSelected: () => number | number[];
  getCorrect: () => number | number[];
  setStartCorrect: (bool: boolean) => void;
  getStartCorrect: () => boolean;
}
