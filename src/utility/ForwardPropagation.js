/*
 * Forward prop for network trained with dropout
 */

export const forwardPropagation = (inputVector, matrices) => {
  inputVector.unshift(1);
  const A1 = relu(matrices.T1.map(v => scalarProduct(v, inputVector)));
  A1.unshift(1);
  const A2 = relu(matrices.T2.map(v => scalarProduct(v, A1)));
  A2.unshift(1);
  const H = softmax(matrices.T3.map(v => scalarProduct(v, A2)));
  return H;
};

const scalarProduct = (vector1, vector2) => {
  if (vector1.length !== vector2.length)
    throw new Error("Vectors must have the same length");

  let result = 0;

  for (let i = 0; i < vector1.length; i++) {
    result = result + vector1[i] * vector2[i];
  }
  return result;
};

const relu = vector => {
  return vector.map(element => {
    if (element > 0) return element;
    return element * 0.01;
  });
};

const softmax = vector => {
  const maxValue = Math.max(...vector);
  const logVector = vector.map(element => Math.exp(element - maxValue));
  const sumOfLogVector = logVector.reduce(
    (accum, currentValue) => accum + currentValue
  );
  return logVector.map(element => element / sumOfLogVector);
};

/* console.log(
  forwardPropagation([-1, 2, -2, -3], {
    T1: [[1, 2, 2, 3, 2], [1, 2, 3, 4, 3]],
    T2: [[1, 1, 3], [1, 1, 3]],
    T3: [[2, 2, 3], [2, 2, 3]]
  })
); */
