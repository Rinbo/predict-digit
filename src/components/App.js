import React, { useState } from "react";
import Canvas from "./Canvas";
import OutputCanvas from "./OutputCanvas";

const App = () => {
  const [scaledImage, setImageData] = useState(null);
  const [inputVector, setInputVector] = useState(null);
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 className="bg-purple-600 m-6 p-6 rounded shadow-lg text-lg">
          Predict the digit!
        </h1>
        <div className="text-base mb-12">
          Write a single digit in the box and see if the neural network can
          predict which number you drew.
        </div>
        <Canvas setImageData={setImageData} setInputVector={setInputVector} />
        <OutputCanvas scaledImage={scaledImage} inputVector={inputVector} />
      </div>
    </div>
  );
};

export default App;
