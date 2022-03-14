import { Question, SingleChoiceAnswer } from "../utils/Question";

const q1title =
  "If you had a magic want to change one thing about the world, what would you do?";

const a1data = [
  "Eat the rich",
  "Slowly influence positive change through peaceful democatic methods",
];

const answer1 = new SingleChoiceAnswer(a1data, 1);

const a2data = ["Forefully bring about world peace", "Continue to allow war"];

const answer2 = new SingleChoiceAnswer(a2data, 0);

const answers = [answer1, answer2];

export const question1 = new Question(q1title, answers);
