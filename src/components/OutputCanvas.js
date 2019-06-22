import React, { useRef, useEffect } from "react";

const OutputCanvas = ({ scaledImage }) => {
  const digitCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    digitCanvas.current.width = 168;
    digitCanvas.current.height = 168;
    digitCanvas.current.style.border = "1 px solid black";
    ctx.current = digitCanvas.current.getContext("2d");
    if (scaledImage) {
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
      ctx.current.putImageData(new ImageData(imageData, 168, 168), 0, 0);
    }
  }, [scaledImage]);

  return <canvas ref={digitCanvas} />;
};

export default OutputCanvas;
