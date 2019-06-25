const file1 = require("../resources/Theta1.txt");

export const forwardPropagation = X => {
  //Add bias term to X
  X.unshift(1);
  const T1 = getFile(file1);

  return T1;
};

const getFile = async input => {
  const response = await fetch(input);
  const text = await response.text();
  const trimmedString = text.trim();
  const outerArray = trimmedString.split(/\n/);
  const output = outerArray.map(row => row.split(","));
  return output;
};

/* 
fetch(file1)
    .then(response => response.text())
    .then(text => {
      const trimmedString = text.trim();
      const outerArray = trimmedString.split(/\n/);
      const output = outerArray.map(row => row.split(","));
      T1 = output;
    }); */
