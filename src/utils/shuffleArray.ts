/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffleArray(array: Array<any>) {
  let shuffled = array.slice(0);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
