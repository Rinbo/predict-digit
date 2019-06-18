import React, { useState, useRef, useEffect } from "react";

const Canvas = () => {
  const [canvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [painting, setPainting] = useState(false);
  const [imageData, setImageData] = useState(null);
  const digitCanvas = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    digitCanvas.current.width = 200;
    digitCanvas.current.height = 200;
    digitCanvas.current.style.border = "1 px solid black";
    ctx.current = digitCanvas.current.getContext("2d");
  }, [canvasSize]);

  const startPosition = e => {
    setPainting(true);
    const pos = getMousePos(e);
    ctx.current.lineTo(pos.x, pos.y);
    ctx.current.stroke();
  };

  const finishedPosition = () => {
    setPainting(false);
    ctx.current.beginPath();
    setImageData(ctx.current.getImageData(0, 0, 200, 200).data);
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

  console.log(imageData);

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
