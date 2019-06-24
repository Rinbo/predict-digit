const file1 = require("../resources/Theta1.txt");

export const forwardPropagation = X => {
  //Add bias term to X
  X.unshift(1);

  fetch(file1)
    .then(response => response.text())
    .then(text => {
      debugger;
      console.log(text);
    });

  X.shift();
  return X;
};
