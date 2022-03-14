export type Question = {
  title: string;
  answers: Answers;
  allCorrect: () => boolean;
};

export type Answers = Array<SingleChoiceAnswer | MultiChoiceAnswer>;

export type SingleChoiceAnswer = {
  answers: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex: number;
  selectAnswer: (index: number) => void;
  isCorrect: () => boolean;
};

export type MultiChoiceAnswer = {
  answers: string[];
  correctAnswerIndex: number[];
  selectedAnswerIndex: number;
  selectAnswer: (index: number) => void;
  isCorrect: () => boolean;
};
