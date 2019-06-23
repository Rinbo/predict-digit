import { SCALE_FACTOR, CONVERTED_PIXEL_COUNT } from "./pixelConstants";

export const convertPixels = image => {
  const grayScaleArray = image.data.filter((e, index) => (index + 1) % 4 === 0);

  const scaledImage = scaler([...grayScaleArray]);
  // Convert back to ImageData object
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
  const sixes = reduceArray(normalizedArray, 6);
  const matrixRows = createMatrix(sixes, 28);
  const matrix = createMatrix(matrixRows, 6);
  const output = matrix.map(e => {
    const twentyEight = [];
    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < e.length; j++) {
        twentyEight[i] = [].concat(twentyEight[i] || [], e[j].splice(0, 1));
      }
    }
    const returnValue = twentyEight.map(matrix => {
      return takeSumAndConvertToRGB(matrix);
    });

    return returnValue;
  });

  return output.flat();

  /* const output = matrix.map(e => {
    const pixelValue = e.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    if (pixelValue > 18) return 255;
    return 0;
  });
  return output; */
};

const reduceArray = (arr, chunkSize) => {
  return arr.reduce((all, currentValue, index) => {
    const chunk = Math.floor(index / chunkSize);
    all[chunk] = [].concat(all[chunk] || [], currentValue);
    return all;
  }, []);
};

const createMatrix = (arr, chunkSize) => {
  return arr.reduce((all, currentValue, index) => {
    const chunk = Math.floor(index / chunkSize);
    if (!all[chunk]) all[chunk] = [];
    all[chunk].push(currentValue);
    return all;
  }, []);
};

const takeSumAndConvertToRGB = arr => {
  const subSums = arr.map(e => {
    return e.reduce((accum, currentValue) => accum + currentValue);
  });
  const finalSum = subSums.reduce(
    (accum, currentValue) => accum + currentValue
  );
  return Math.floor((finalSum / 36) * 255);
};

/* 
const matrix = [];
  for (let i = 0; i < CONVERTED_PIXEL_COUNT ** 2; i++) {
    matrix[i] = [];
  }

  for (let i = 0; i < CONVERTED_PIXEL_COUNT; i++) {
    for (let j = 0; j < SCALE_FACTOR; j++) {
      for (let k = 0; k < CONVERTED_PIXEL_COUNT; k++) {
        const index = i * CONVERTED_PIXEL_COUNT + k;
        matrix[index] = matrix[index].concat(
          normalizedArray.splice(0, SCALE_FACTOR)
        );
      }
    }
  }
*/
