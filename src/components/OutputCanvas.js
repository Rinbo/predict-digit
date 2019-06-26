import React, { useRef, useEffect, useState } from "react";
import { CONVERTED_PIXEL_COUNT } from "../utility/pixelConstants";
//import { forwardPropagation } from "../utility/LoadThetaMatrices";

const OutputCanvas = ({ scaledImage, inputVector, thetaMatrices }) => {
  const [prediction, setPrediction] = useState(null);
  const digitCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    digitCanvas.current.width = CONVERTED_PIXEL_COUNT;
    digitCanvas.current.height = CONVERTED_PIXEL_COUNT;
    digitCanvas.current.style.border = "1 px solid black";
    ctx.current = digitCanvas.current.getContext("2d");
    if (scaledImage) {
      ctx.current.putImageData(scaledImage, 0, 0);
    }
    if (inputVector) {
      //forwardPropagation(inputVector) //.then(response => setPrediction(response));
    }
  }, [scaledImage, inputVector]);
  
  return <canvas ref={digitCanvas} />;
};

export default OutputCanvas;
