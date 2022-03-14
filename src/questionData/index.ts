import { Question, SingleChoiceAnswer } from "../Question";

const q1title =
  "If you had a magic want to change either thing about the world, what would you do?";

const a1data = ["Eat the rich", "Persuade the rich to pay tax"];

const answer1 = new SingleChoiceAnswer(a1data, 0);

const a2data = ["Save the environment", "World peace"];

const answer2 = new SingleChoiceAnswer(a2data, 0);

const a3data = ["End corruption", "Take bribes"];

const answer3 = new SingleChoiceAnswer(a3data, 1);

const answers = [answer1, answer2, answer3];

export const question1 = new Question(q1title, answers);
