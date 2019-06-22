import React, { useRef, useEffect } from "react";

const OutputCanvas = ({ imageData }) => {
  const digitCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    digitCanvas.current.width = 168;
    digitCanvas.current.height = 168;
    digitCanvas.current.style.border = "1 px solid black";
    ctx.current = digitCanvas.current.getContext("2d");
    if (imageData) ctx.current.putImageData(imageData, 0, 0);
  }, [imageData]);

  return <canvas ref={digitCanvas} />;
};

export default OutputCanvas;
