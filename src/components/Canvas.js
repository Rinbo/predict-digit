import React, { useState, useRef, useEffect } from "react";

const Canvas = ({ setImageData }) => {
  const [painting, setPainting] = useState(false);
  const digitCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    digitCanvas.current.width = 168;
    digitCanvas.current.height = 168;
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
    parseImage(ctx.current.getImageData(0, 0, 168, 168));
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
    ctx.current.lineWidth = 10;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = "black";
    ctx.current.lineTo(pos.x, pos.y);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(pos.x, pos.y);
  };

  const parseImage = image => {
    const grayScaleArray = image.data.filter(
      (e, index) => (index + 1) % 4 === 0
    );
    setImageData(grayScaleArray);
   
  };

  return (
    <canvas
      ref={digitCanvas}
      onMouseDown={e => startPosition(e)}
      onMouseUp={() => finishedPosition()}
      onMouseMove={e => draw(e)}
    />
  );
};

export default Canvas;
