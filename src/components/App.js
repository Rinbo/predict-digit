import React, { useState } from "react";
import Canvas from "./Canvas";
import OutputCanvas from "./OutputCanvas";

const App = () => {
  const [imageData, setImageData] = useState(null);

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
        <Canvas setImageData={setImageData} />
        <OutputCanvas imageData={imageData} />
      </div>
    </div>
  );
};

export default App;
