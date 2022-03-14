export type QuestionData = {
  title: string;
  answers: Answer[];
};

export type Answer = {
  answers: string[];
  isCorrect: () => boolean;
};
