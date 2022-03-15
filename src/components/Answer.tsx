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
const animateToBot50 = keyframes`from { left: 0; } to { left: 50%; transform: translateY(-100%);}`;
const animateToBot0 = keyframes`from { bottom: 50%; } to { bottom: 0; transform: translateY(100%);}`;

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
  let keyFrameToSetLg: Keyframes;
  let keyFrameToSetSm: Keyframes;
  if (startingPos === "0") {
    keyFrameToSetLg = animateToLeft0;
    keyFrameToSetSm = animateToBot50;
  } else {
    keyFrameToSetLg = animateToLeft50;
    keyFrameToSetSm = animateToBot0;
  }

  const [keyFrameLg, setKeyFrameLg] = useState<Keyframes | null>(null);
  const [keyFrameSm, setKeyFrameSm] = useState<Keyframes | null>(null);

  const setAnimation = () => {
    if (!keyFrameLg || !keyFrameSm) {
      setKeyFrameLg(keyFrameToSetLg);
      setKeyFrameSm(keyFrameToSetSm);
      if (keyFrameToSetLg === animateToLeft0) {
        setStartingPos("50%");
      } else {
        setStartingPos("0");
      }
    } else {
      setKeyFrameLg(
        keyFrameLg === animateToLeft0 ? animateToLeft50 : animateToLeft0
      );
      setKeyFrameSm(
        keyFrameSm === animateToBot0 ? animateToBot50 : animateToLeft0
      );
      if (keyFrameLg === animateToLeft0) {
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
        width={{ base: "100%", md: "50%" }}
        height={{ base: "50%", md: "101%" }}
        left={{ base: "", md: startingPos }}
        bottom={{ base: startingPos, md: "" }}
        zIndex="0"
        borderRadius={{ base: "100px 100px 0px 0px", md: "100px" }}
        animation={{
          base: keyFrameSm ? `${keyFrameSm} 5s linear` : "",
          md: keyFrameLg ? `${keyFrameLg} 5s linear` : "",
        }}
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
