import { Box, Center, Flex, Text, keyframes } from "@chakra-ui/react";
import { Keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { AnswerInterface } from "../types";

interface AnswerProps {
  answer: AnswerInterface;
  checkCorrect: () => void;
  allCorrect: boolean;
}

// Index 0: incorrect, 1: correct
const answerStyles = {
  borderColor: ["#F9D29F", "#FBFBFB"],
  highlightTextColor: ["#9F938B", "#4CAD94"],
  toggleColor: ["#F8CAA3", "#A5E7E2"],
};

const animateToLeft50 = keyframes`from { left: 0; } to { left: 50%; transform: translateX(-100%);}`;
const animateToLeft0 = keyframes`from { left: 50%; } to { left: 0; transform: translateX(100%);}`;

export function SingleChoiceAnswer({
  answer,
  checkCorrect,
  allCorrect,
}: AnswerProps) {
  //Sets the flex basis proportionally to the number of options
  const flexBasis = Math.floor(100 / answer.options.length);

  const correctAnswerIndex = answer.getCorrect() as number;

  const [startingPos, setStartingPos] = useState<string>("");

  // Sets the starting position of the overlay (left prop)
  // Sets selected answer on answer class
  useEffect(() => {
    if (answer.getStartCorrect()) {
      setStartingPos(correctAnswerIndex === 0 ? "0" : "50%");
    } else {
      if (correctAnswerIndex === 0) {
        setStartingPos("50%");
      } else {
        setStartingPos("0");
      }
    }
  }, [answer, correctAnswerIndex]);

  // Sets starting key frame for animation
  let keyFrameToSet: Keyframes;
  if (startingPos === "0") {
    keyFrameToSet = animateToLeft0;
  } else {
    keyFrameToSet = animateToLeft50;
  }

  const [keyFrame, setKeyFrame] = useState<Keyframes | null>(null);

  const setAnimation = () => {
    if (!keyFrame) {
      setKeyFrame(keyFrameToSet);
      if (keyFrameToSet === animateToLeft0) {
        setStartingPos("50%");
      } else {
        setStartingPos("0");
      }
    } else {
      setKeyFrame(
        keyFrame === animateToLeft0 ? animateToLeft50 : animateToLeft0
      );
      if (keyFrame === animateToLeft0) {
        setStartingPos("0");
      } else {
        setStartingPos("50%");
      }
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-around"
      flexWrap="wrap"
      borderColor={
        allCorrect ? answerStyles.borderColor[1] : answerStyles.borderColor[0]
      }
      borderRadius="100px"
      borderWidth="2px"
      width={{ base: "100%", md: "75%", lg: "66%" }}
      my={4}
      marginX="auto"
      position="relative"
    >
      <Box
        position="absolute"
        background={
          allCorrect ? answerStyles.toggleColor[1] : answerStyles.toggleColor[0]
        }
        width="50%"
        height="101%"
        left={startingPos}
        zIndex="0"
        borderRadius="100px"
        animation={keyFrame ? `${keyFrame} 5s linear` : ""}
      ></Box>
      {answer.options.map((option, i) => (
        <AnswerOption
          checkCorrect={checkCorrect}
          option={option}
          flexBasis={flexBasis}
          answer={answer}
          i={i}
          setAnimation={setAnimation}
          key={i}
          allCorrect={allCorrect}
        />
      ))}
    </Flex>
  );
}

interface AnswerOptionProps {
  option: string;
  flexBasis: number;
  checkCorrect: () => void;
  answer: AnswerInterface;
  i: number;
  setAnimation: () => void;
  allCorrect: boolean;
}

function AnswerOption({
  option,
  flexBasis,
  setAnimation,
  checkCorrect,
  answer,
  i,
  allCorrect,
}: AnswerOptionProps) {
  return (
    <Center
      flexBasis={{ base: "100%", md: "50%", xl: flexBasis }}
      minW="250px"
      minH="48px"
      onClick={() => {
        if (allCorrect) return;
        if (answer.getSelected() === i) return;
        setAnimation();
        answer.selectAnswer(i);
        checkCorrect();
      }}
    >
      <Text
        fontSize={{ base: "18px", md: "24px" }}
        display="block"
        cursor="default"
        borderRadius="100px"
        color="white"
        zIndex="1"
      >
        {option}
      </Text>
    </Center>
  );
}
