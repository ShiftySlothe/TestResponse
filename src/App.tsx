import { ChakraProvider, Flex } from "@chakra-ui/react";
import Question from "./components/Question";
import { question1 } from "./questionData";

export const App = () => (
  <ChakraProvider resetCSS>
    <Flex w="100vw" minH="100vh" alignItems="center" justifyContent="center">
      <Question question={question1} randomOrder />
    </Flex>
  </ChakraProvider>
);
