import React, { useState, useRef, useEffect } from "react";

const Canvas = () => {
  const [canvasSize] = useState({ width: 200, height: 200 });
  const [ctx, setCtx] = useState(null);
  const [painting, setPainting] = useState(false);
  const digitCanvas = useRef(null);

  useEffect(() => {
    digitCanvas.current.width = canvasSize.width;
    digitCanvas.current.height = canvasSize.height;
    digitCanvas.current.style.border = "1 px solid black";
    setCtx(digitCanvas.current.getContext("2d"));
    console.log(digitCanvas.current.getContext("2d"));
  }, [canvasSize]);

  const startPosition = () => {
    setPainting(true);
  };

  const finishedPosition = () => {
    setPainting(false);
  };

  const draw = e => {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  return (
    <canvas
      ref={digitCanvas}
      onMouseDown={startPosition}
      onMouseUp={finishedPosition}
      onMouseMove={e => draw(e)}
    />
  );
};

export default Canvas;
