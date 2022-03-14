function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function selectHalfIndexsRandomly(arrayOfIndexs: number[]) {
  let indexs: number[] = [];
  // Will ensure at least 1 elemenet is returned
  // Will aim to return half elements
  while (indexs.length < Math.ceil(arrayOfIndexs.length / 2)) {
    const randomIndex = getRandomInt(0, arrayOfIndexs.length);
    if (!indexs.includes(randomIndex)) {
      indexs.push(randomIndex);
    }
  }
  return indexs;
}

export function getHalfIndexesRandomly(array: any[]): number[] {
  const arrayOfIndexs = Array.from(
    { length: array.length },
    (item, index) => index
  );

  return selectHalfIndexsRandomly(arrayOfIndexs);
}
