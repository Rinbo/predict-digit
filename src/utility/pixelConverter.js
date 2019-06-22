import { ORIGIN_PIXEL_COUNT, CONVERTED_PIXEL_COUNT } from "./pixelConstants";

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
  /*
  const rowByRow = [];
  for (let i = 0; i < 168; i++) {
    rowByRow[i] = [];
    for (let j = 0; j < 28; j++) {
      for (let k = j * 6; k < j * 6 + 6; k++) {
        rowByRow[i].push(normalizedArray[k].splice(0, 6));
      }
    }
  }
  */

  const matrix = [];
  for (let i = 0; i < CONVERTED_PIXEL_COUNT ** 2; i++) {
    matrix[i] = [];
  }

  for (let i = 0; i < CONVERTED_PIXEL_COUNT; i++) {
    for (let j = 0; j < 6; j++) {
      for (let k = 0; k < CONVERTED_PIXEL_COUNT; k++) {
        const index = i * 28 + k;
        matrix[index] = matrix[index].concat(normalizedArray.splice(0, 6));
      }
    }
  }
  const output = matrix.map(e => {
    const pixelValue = e.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    if (pixelValue > 18) return 255;
    return 0;
  });
  return output;
  /* 
  const matrix = [];
  for (let i = 0; i < CONVERTED_PIXEL_COUNT; i++) {
    matrix[i].push(rowByRow[j].splice(0, 6));
  } */
};
