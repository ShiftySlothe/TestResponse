import { AnswerType } from "../types";

export class Question {
  title: string;
  answers: AnswerType[];

  constructor(title: string, answers: AnswerType[]) {
    this.title = title;
    this.answers = answers;
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

export class SingleChoiceAnswer implements SingleChoiceAnswer {
  answers: string[];
  private correctAnswerIndex: number;
  private selectedAnswerIndex: number;

  constructor(answers: string[], correctAnswerIndex: number) {
    this.answers = answers;
    this.correctAnswerIndex = correctAnswerIndex;
    this.selectedAnswerIndex = -1;
  }

  selectAnswer(index: number) {
    this.selectedAnswerIndex = index;
  }

  isCorrect() {
    return this.correctAnswerIndex === this.selectedAnswerIndex;
  }
}

export class MultiChoiceAnswer implements MultiChoiceAnswer {
  answers: string[];
  private correctAnswerIndexs: number[];
  private selectedAnswerIndexs: number[];

  constructor(answers: string[], correctAnswerIndexs: number[]) {
    this.answers = answers;
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
}
