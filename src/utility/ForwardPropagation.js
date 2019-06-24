export const forwardPropagation = X => {
  //Add bias term to X
  X.unshift(1);

  X.shift();
  return X
};
