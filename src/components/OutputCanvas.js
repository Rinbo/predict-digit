import React, { useEffect, useState } from "react";
import { forwardPropagation } from "../utility/ForwardPropagation";

const OutputCanvas = ({
  scaledImage,
  inputVector,
  thetaMatrices,
  showPrediction
}) => {
  const [prediction, setPrediction] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    /* digitCanvas.current.width = CONVERTED_PIXEL_COUNT;
    digitCanvas.current.height = CONVERTED_PIXEL_COUNT;
    digitCanvas.current.style.border = "1 px solid black";
    ctx.current = digitCanvas.current.getContext("2d");
    if (scaledImage) {
      ctx.current.putImageData(scaledImage, 0, 0);
    } */

    if (!showPrediction) {
      setPrediction([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    } else if (inputVector) {
      setPrediction(forwardPropagation(inputVector, thetaMatrices));
    }
  }, [scaledImage, inputVector, thetaMatrices, showPrediction]);

  return (
    <>
      {/*<canvas ref={digitCanvas} style={{ width: 28, height: 28 }} />*/}
      <h1>
        <p className="text-3xl">
          {showPrediction
            ? prediction.indexOf(Math.max(...prediction)) + 1
            : ""}
        </p>
        {prediction.map((e, index) => {
          return (
            <div key={index}>
              Digit {index + 1}: {Math.floor(e * 100)}
            </div>
          );
        })}
      </h1>
    </>
  );
};

export default OutputCanvas;
