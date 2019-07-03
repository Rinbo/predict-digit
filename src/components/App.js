import React, { useState, useEffect } from "react";
import { loadMatrix } from "../utility/LoadMatrix";
import Canvas from "./Canvas";
import OutputCanvas from "./OutputCanvas";

const file1 = require("../resources/T1.txt");
const file2 = require("../resources/T2.txt");
const file3 = require("../resources/T3.txt");

const App = () => {
  const [scaledImage, setImageData] = useState(null);
  const [inputVector, setInputVector] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [thetaMatrices, setThetaMatrices] = useState({
    T1: null,
    T2: null,
    T3: null
  });

  useEffect(() => {
    loadMatrix(file1).then(response =>
      setThetaMatrices(prevState => {
        return { ...prevState, T1: response };
      })
    );
    loadMatrix(file2).then(response =>
      setThetaMatrices(prevState => {
        return { ...prevState, T2: response };
      })
    );
    loadMatrix(file3).then(response =>
      setThetaMatrices(prevState => {
        return { ...prevState, T3: response };
      })
    );
  }, []);
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 className="bg-green-500 m-6 p-6 rounded shadow-lg text-lg">
          Predict the digit!
        </h1>

        <div className="text-base mb-12">
          Write a single digit in the box and see if the neural network can
          predict which number you drew.
        </div>
        <div className="flex flex-wrap justify-center content-center">
          <Canvas
            setImageData={setImageData}
            setInputVector={setInputVector}
            setShowPrediction={setShowPrediction}
          />
          <OutputCanvas
            scaledImage={scaledImage}
            inputVector={inputVector}
            thetaMatrices={thetaMatrices}
            showPrediction={showPrediction}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
