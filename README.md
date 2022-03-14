# FigmaReactTechChallenge

Technical challenge to recreate a Figma component in React

## Assumptions

- Chakra UI Styling Libary used
- Randomly selects 50% of questions to start correct/ incorrect
- Cannot handle more than two options
- Non-essential dev packages should be in dev dependancies

## Next Steps

- Testing
- Use Grid rather than Flex to allow for more than 2 answers
- Implementing a form libary such as Formik to allow for multiple questions 
- Allow multiple choice questions

## Comments 

### Random Options 

By pre-selecting an option, I've had to implement more complex logic to randomise half of the questions to be selected correct. Doing it completely randomly might lead to the question being 100% correct and only selecting one side would make 2 answer questions obvious. 

I'd suggest to the designer that it might be better to allow the user to select the inital option to avoid the effort of implementing this logic. 

### Grid vs Flex

I initally decided to use flex and an absolutely positioned div to render the sliding, after testing I would change this styling and implement a responsive grid system to allow for more than 2 options per answer. 

## Personal next steps

Your challenge has highlighted a gap in my CSS knowledge in terms of animations. I'm going to spend some time brushing up on the best way to animate components using both pure CSS and React libaries such as Framer Motion. 