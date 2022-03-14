import { Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { QuestionType } from "../types";

interface QuestionProps {
  question: QuestionType;
  randomOrder?: boolean;
}
export default function Question({ question, randomOrder }: QuestionProps) {
  return (
    <Container
      maxW="container.md"
      width="100%"
      height="100%"
      textAlign="center"
    >
      <QuestionTitle title={question.title} />

      <Text>Answer</Text>
    </Container>
  );
}

interface QuestionTitleProps {
  title: string;
}
function QuestionTitle({ title }: QuestionTitleProps) {
  return <Text>{title}</Text>;
}

