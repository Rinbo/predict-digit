import { SCALE_FACTOR, CONVERTED_PIXEL_COUNT } from "./pixelConstants";

export const convertPixels = (image, setInputVector) => {
  const grayScaleArray = image.data.filter((e, index) => (index + 1) % 4 === 0);
  const scaledImage = scaler([...grayScaleArray]);
  setInputVector(scaledImage);
  /*
   * Convert back to ImageData object
   *
   */
  const arr = [];
  for (let i = 0; i < scaledImage.length; i++) {
    for (let j = 0; j < 4; j++) {
      if (j !== 3) {
        arr.push(0);
      } else {
        arr.push(scaledImage[i]);
      }
    }
  }
  const imageData = new Uint8ClampedArray(arr);

  return new ImageData(imageData, CONVERTED_PIXEL_COUNT, CONVERTED_PIXEL_COUNT);
};

const scaler = imageArray => {
  const normalizedArray = imageArray.map(e => Math.ceil(e / 255));

  /*
   * Chop up into array chunks adhering to scale factor
   *
   */
  const sixes = createMatrix(normalizedArray, SCALE_FACTOR);

  /*
   * Intermediary step creating a matrix each row is an array consisting of CONVERTED_PIXEL_COUNT elements and each element having the size of the scale factor
   *
   */
  const matrixRows = createMatrix(sixes, CONVERTED_PIXEL_COUNT);

  /*
   * Once again reformat matrix to take the form of containing CONVERTED_PIXEL_COUNT elements in the outermost layer.
   * Each one of these arrays contain the information to create one row of the converted pixel matrix
   * Basically this sets up the matrix to be plucked effeciently
   */
  const matrix = createMatrix(matrixRows, SCALE_FACTOR);

  const output = matrix.map(e => {
    const convertedPixelRow = [];
    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < e.length; j++) {
        convertedPixelRow[i] = [].concat(
          convertedPixelRow[i] || [],
          e[j].splice(0, 1)
        );
      }
    }
    const returnValue = convertedPixelRow.map(matrix => {
      return takeSumAndNormalize(matrix);
    });

    return returnValue;
  });

  /*
   * Reshape matrix to correspond to how matrixes are constructed from vectors in octave (column by column instead of row by row)
   *
   */
  const rotatedOutput = [];
  for (let i = 0; i < 28; i++) {
    rotatedOutput[i] = [];
    output.forEach(arr => {
      rotatedOutput[i].push(arr[i]);
    });
  }
  return rotatedOutput.flat();
};

/*
 * Helper function that takes in an array and reduces it into a new array with inner arrays of size passed in as parameter 'chunkSize'
 *
 */
const createMatrix = (arr, chunkSize) => {
  return arr.reduce((all, currentValue, index) => {
    const chunk = Math.floor(index / chunkSize);
    if (!all[chunk]) all[chunk] = [];
    all[chunk].push(currentValue);
    return all;
  }, []);
};

/*
 * Custum function calculates the sum of a nested array and converts the binary pixel values back into grayscale
 *
 */
const takeSumAndNormalize = arr => {
  const subSums = arr.map(e => {
    return e.reduce((accum, currentValue) => accum + currentValue);
  });
  const finalSum = subSums.reduce(
    (accum, currentValue) => accum + currentValue
  );

  return finalSum / 36;
};
