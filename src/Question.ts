import { AnswerInterface } from "./types";
import { getHalfIndexesRandomly } from "./utils/getRandomHalfIndexs";
import { shuffleArray } from "./utils/shuffleArray";

export class Question {
  title: string;
  answers: AnswerInterface[];

  constructor(title: string, answers: AnswerInterface[]) {
    this.title = title;
    this.answers = answers;
    this.setSelected();
  }

  randomiseOrder() {
    this.answers = shuffleArray(this.answers);
  }

  getNumberCorrect() {
    let count = 0;
    this.answers.forEach((answer) => {
      if (answer.getSelected() === answer.getCorrect()) {
        count++;
      }
    });

    return count;
  }
  // Randomly sets 50% of answers to start true & vice versa
  setSelected() {
    const indexsToStartCorrect = getHalfIndexesRandomly(this.answers);
    this.answers.forEach((answer, i) => {
      const correctAnswer = answer.getCorrect();
      if (indexsToStartCorrect.includes(i)) {
        answer.setStartCorrect(true);
        if (typeof correctAnswer === "number") {
          answer.selectAnswer(correctAnswer);
        } else {
          answer.selectAnswer(correctAnswer[0]);
        }
      } else {
        if (typeof correctAnswer === "number") {
          if (correctAnswer === 0) {
            answer.selectAnswer(1);
          } else {
            answer.selectAnswer(0);
          }
        } else {
          for (let i = 0; i < answer.options.length; i++) {
            if (!correctAnswer.includes(i)) {
              answer.selectAnswer(i);
              break;
            }
          }
        }
      }
    });
  }
  allCorrect() {
    let isCorrect = true;
    this.answers.forEach((answer) => {
      if (!answer.isCorrect()) {
        isCorrect = false;
      }
    });
    return isCorrect;
  }
}

export class SingleChoiceAnswer implements AnswerInterface {
  options: string[];
  private correctAnswerIndex: number;
  private selectedAnswerIndex: number;
  private startCorrect: boolean = false;

  constructor(answers: string[], correctAnswerIndex: number) {
    this.options = answers;
    this.correctAnswerIndex = correctAnswerIndex;
    this.selectedAnswerIndex = -1;
  }

  selectAnswer(index: number) {
    this.selectedAnswerIndex = index;
  }

  isCorrect() {
    return this.correctAnswerIndex === this.selectedAnswerIndex;
  }

  getSelected() {
    return this.selectedAnswerIndex;
  }

  getCorrect() {
    return this.correctAnswerIndex;
  }

  setStartCorrect(bool: boolean) {
    this.startCorrect = bool;
  }
  getStartCorrect() {
    return this.startCorrect;
  }
}

export class MultiChoiceAnswer implements AnswerInterface {
  options: string[];
  private correctAnswerIndexs: number[];
  private selectedAnswerIndexs: number[];
  private startCorrect: boolean = false;

  constructor(answers: string[], correctAnswerIndexs: number[]) {
    this.options = answers;
    this.correctAnswerIndexs = correctAnswerIndexs;
    this.selectedAnswerIndexs = [];
  }

  selectAnswer(index: number) {
    //Only pushes unique items to array
    if (this.selectedAnswerIndexs.indexOf(index) === -1)
      this.selectedAnswerIndexs.push(index);
  }

  isCorrect() {
    let isCorrect = true;
    this.correctAnswerIndexs.forEach((index) => {
      if (!this.selectedAnswerIndexs.includes(index)) isCorrect = false;
    });
    return isCorrect;
  }

  getSelected() {
    return this.selectedAnswerIndexs;
  }

  getCorrect() {
    return this.correctAnswerIndexs;
  }

  setStartCorrect(bool: boolean) {
    this.startCorrect = bool;
  }
  getStartCorrect() {
    return this.startCorrect;
  }
}
