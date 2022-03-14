import { Question, SingleChoiceAnswer } from "../Question";

const q1title =
  "If you had a magic want to change either thing about the world, what would you do?";

const a1data = ["Eat the rich", "Peaceful democatic methods"];

const answer1 = new SingleChoiceAnswer(a1data, 1);

const a2data = ["Partially permeable membrane", "Nucleus"];

const answer2 = new SingleChoiceAnswer(a2data, 0);

const a3data = ["Jeff", "Daaaaaave"];

const answer3 = new SingleChoiceAnswer(a3data, 0);

const a4data = ["foo", "bar"];

const answer4 = new SingleChoiceAnswer(a4data, 1);

const answers = [answer1, answer2, answer3, answer4];

export const question1 = new Question(q1title, answers);
