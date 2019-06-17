import React from "react";
import Canvas from "./Canvas";

const App = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <h1 className="bg-purple-600 m-6 p-6 rounded shadow-lg text-lg">
          Predict the digit!
        </h1>
        <div className="text-base">
          Write a single digit in the box and see if the neural network can
          predict which number you drew.
        </div>
        <Canvas />
      </div>
    </div>
  );
};

export default App;
