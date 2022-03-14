import { Box, Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { QuestionType } from "../types";
import { SingleChoiceAnswer } from "./Answer";

const backgroundGradient = {
  incorrect: [
    ["#F6B667", "#EE6F30"],
    ["#F6B667", "#ED8E2F"],
    ["#F5E467", "#EDAE2F"],
    ["#EEF567", "#EDCE2F"],
    ["#D6F567", "#EDED2F"],
  ],
  correct: ["#76DFC3", "#59CADA"],
};

interface QuestionProps {
  question: QuestionType;
  randomOrder?: boolean;
}
export default function Question({ question, randomOrder }: QuestionProps) {
  if (randomOrder) {
    question.randomiseOrder();
  }

  const [allCorrect, setAllCorrect] = useState<boolean>(false);
  const [variableBGIndex, setVariableBGIndex] = useState(0);
  const variableBG = `linear(to-b, ${backgroundGradient.incorrect[variableBGIndex][0]}, ${backgroundGradient.incorrect[variableBGIndex][1]} )`;

  const checkCorrect = () => {
    setAllCorrect(question.allCorrect());
    setVariableBGIndex(question.getNumberCorrect() - 1);
  };

  return (
    <Container
      maxW="container.xl"
      width="100%"
      height="100%"
      textAlign="center"
      bgGradient={
        allCorrect
          ? `linear(to-b, ${backgroundGradient.correct[0]}, ${backgroundGradient.correct[1]})`
          : variableBG
      }
      py={{ base: "16px", md: "50px", lg: "80px", xl: "120px" }}
    >
      <QuestionTitle title={question.title} />
      {question.answers.map((answer, i) => (
        <SingleChoiceAnswer
          answer={answer}
          key={i}
          checkCorrect={checkCorrect}
          allCorrect={allCorrect}
        />
      ))}
      <AnswerResponse allCorrect={allCorrect} />
    </Container>
  );
}

interface QuestionTitleProps {
  title: string;
}

function QuestionTitle({ title }: QuestionTitleProps) {
  return (
    <Text
      minWidth="300px"
      fontSize={{ base: "20px", md: "40px" }}
      color="white"
    >
      {title}
    </Text>
  );
}

interface AnswerResponseProps {
  allCorrect: boolean;
}

function AnswerResponse({ allCorrect }: AnswerResponseProps) {
  return (
    <Box py={3}>
      <Text color="white" fontSize={{ sm: "16px", md: "32px" }}>
        {allCorrect ? "The answer is correct!" : "The answer is incorrect"}
      </Text>
    </Box>
  );
}
