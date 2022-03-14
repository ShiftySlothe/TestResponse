export type QuestionType = {
  title: string;
  answers: AnswerType[];
  allCorrect: () => boolean;
};

export interface AnswerType {
  answers: string[];
  selectAnswer: (index: number) => void;
  isCorrect: () => boolean;
}

export type SingleChoiceAnswer = {
  correctAnswerIndex: number;
  selectedAnswerIndex: number;
  selectAnswer: (index: number) => void;
  isCorrect: () => boolean;
};

export type MultiChoiceAnswer = {
  answers: string[];
  correctAnswerIndexs: number[];
  selectedAnswerIndexs: number[];
  selectAnswer: (index: number) => void;
  isCorrect: () => boolean;
};
