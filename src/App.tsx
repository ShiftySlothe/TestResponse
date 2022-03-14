import { ChakraProvider, Flex } from "@chakra-ui/react";
import MultiChoiceQ from "./components/MultiChoiceQ";

export const App = () => (
  <ChakraProvider>
    <Flex w="100vw" minH="100vh" alignItems="center" justifyContent="center">
      <MultiChoiceQ />{" "}
    </Flex>
  </ChakraProvider>
);
