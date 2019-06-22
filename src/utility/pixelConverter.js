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
  const matrix = [];
  for (let i = 0; i < CONVERTED_PIXEL_COUNT ** 2; i++) {
    matrix[i] = [];
  }

  for (let i = 0; i < CONVERTED_PIXEL_COUNT; i++) {
    for (let j = 0; j < SCALE_FACTOR; j++) {
      for (let k = 0; k < CONVERTED_PIXEL_COUNT; k++) {
        const index = i * CONVERTED_PIXEL_COUNT + k;
        matrix[index] += accumulate(normalizedArray.splice(0, SCALE_FACTOR));
        
      }
    }
  }

  return matrix;
};

const accumulate = arr => {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue);
};
