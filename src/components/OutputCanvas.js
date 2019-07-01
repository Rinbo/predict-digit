import React, { useRef, useEffect, useState } from "react";
import { CONVERTED_PIXEL_COUNT } from "../utility/pixelConstants";
import { forwardPropagation } from "../utility/ForwardPropagation";

const OutputCanvas = ({ scaledImage, inputVector, thetaMatrices }) => {
  const [prediction, setPrediction] = useState([0,0,0,0,0,0,0,0,0,0]);
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
      setPrediction(forwardPropagation(inputVector, thetaMatrices));
    }
  }, [scaledImage, inputVector, thetaMatrices]);

  return (
    <>
      <canvas ref={digitCanvas} style={{ width: 28, height: 28 }} />      
      <h1>
      <p className="text-3xl">{prediction.indexOf(Math.max(...prediction))+1}</p>
        {prediction.map((e, index) => {
          return (
            <div key={index}>
              Digit {index+1}: {Math.floor(e*100)}
            </div>
          );
        })}
      </h1>
    </>
  );
};

export default OutputCanvas;
