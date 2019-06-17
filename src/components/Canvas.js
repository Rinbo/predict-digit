import React, { useState, useRef, useEffect } from "react";

const Canvas = () => {
  const [canvasSize] = useState({ width: 200, height: 200 });
  const digitCanvas = useRef(null);

  useEffect(() => {
    digitCanvas.current.width = canvasSize.width;
    digitCanvas.current.height = canvasSize.height;
    digitCanvas.current.style.border = "1 px solid black";
    console.log(digitCanvas);
  }, [canvasSize]);

  return <canvas ref={digitCanvas} />;
};

export default Canvas;
