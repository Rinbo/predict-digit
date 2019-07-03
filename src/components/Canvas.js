import React, { useState, useRef, useEffect } from "react";
import { convertPixels } from "../utility/pixelConverter";
import { ORIGIN_PIXEL_COUNT } from "../utility/pixelConstants";

const Canvas = ({ setImageData, setInputVector, setShowPrediction }) => {
  const [painting, setPainting] = useState(false);
  const digitCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    digitCanvas.current.width = ORIGIN_PIXEL_COUNT;
    digitCanvas.current.height = ORIGIN_PIXEL_COUNT;
    ctx.current = digitCanvas.current.getContext("2d");
  }, []);

  const startPosition = e => {
    setPainting(true);
    const pos = getMousePos(e);
    ctx.current.lineTo(pos.x, pos.y);
    ctx.current.stroke();
  };

  const finishedPosition = () => {
    setPainting(false);
    ctx.current.beginPath();
    parseImage(
      ctx.current.getImageData(0, 0, ORIGIN_PIXEL_COUNT, ORIGIN_PIXEL_COUNT)
    );
  };

  const getMousePos = e => {
    const rect = digitCanvas.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const draw = e => {
    if (!painting) return;
    const pos = getMousePos(e);
    ctx.current.lineWidth = 12;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = "black";
    ctx.current.lineTo(pos.x, pos.y);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(pos.x, pos.y);
  };

  const parseImage = image => {
    const convertedImage = convertPixels(image, setInputVector);
    setShowPrediction(true);
    setImageData(convertedImage);
  };

  return (
    <div
      className="flex flex-col justify-center"
      style={{height: 240}}
    >
      <canvas
        className="myCanvas"
        ref={digitCanvas}
        onMouseDown={e => startPosition(e)}
        onMouseUp={() => finishedPosition()}
        onMouseMove={e => draw(e)}
        onTouchStart={e => startPosition(e)}
        onTouchEnd={() => finishedPosition()}
        onTouchMove={e => draw(e)}
      />
      <div>
        <button
          className="btn btn-green"
          style={{ margin: 10 }}
          onClick={() => {
            ctx.current.clearRect(0, 0, ORIGIN_PIXEL_COUNT, ORIGIN_PIXEL_COUNT);
            setShowPrediction(false);
          }}
        >
          Erase
        </button>
      </div>
    </div>
  );
};

export default Canvas;
