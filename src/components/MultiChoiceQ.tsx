import { createContext } from "react";
import { Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";

const QuestionContext = createContext(false);

export default function MultiChoiceQ() {
  return (
    <Container
      maxW="container.md"
      width="100%"
      height="100%"
      textAlign="center"
    >
      <QuestionContext.Provider value={false}>
        <Text>TITLE</Text>
        <Text>Lorem, ipsum dolor.</Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates,
          rerum!
        </Text>
        <Text>Answer</Text>
      </QuestionContext.Provider>
    </Container>
  );
}
