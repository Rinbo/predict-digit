import React, { useRef, useEffect } from "react";
import { CONVERTED_PIXEL_COUNT } from "../utility/pixelConstants";

const OutputCanvas = ({ scaledImage }) => {
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
  }, [scaledImage]);

  return <canvas ref={digitCanvas} />;
};

export default OutputCanvas;
