import React, { useEffect, useState } from "react";
import { forwardPropagation } from "../utility/ForwardPropagation";
import BarChart from "./BarChart";

const OutputCanvas = ({
  scaledImage,
  inputVector,
  thetaMatrices,
  showPrediction
}) => {
  const [prediction, setPrediction] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!showPrediction) {
      setPrediction([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    } else if (inputVector) {
      setPrediction(forwardPropagation(inputVector, thetaMatrices));
    }
  }, [scaledImage, inputVector, thetaMatrices, showPrediction]);

  return (
    <div className="flex flex-col justify-start" style={{ height: 240 }}>
      <div className="text-3xl" style={{ height: 50 }}>
        {showPrediction
          ? `Predicted digit: ${
              prediction.indexOf(Math.max(...prediction)) + 1 === 10
                ? 0
                : prediction.indexOf(Math.max(...prediction)) + 1
            }`
          : ""}
      </div>

      <div>
        <BarChart prediction={prediction} />
      </div>
    </div>
  );
};

export default OutputCanvas;
