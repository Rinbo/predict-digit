export const loadMatrix = file => {
  const matrix = getFile(file);
  return matrix;
};

const getFile = async input => {
  try {
    const response = await fetch(input);
    const text = await response.text();
    const trimmedString = text.trim();
    const outerArray = trimmedString.split(/\n/);
    const output = outerArray.map(row => row.split(","));
    return output;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
