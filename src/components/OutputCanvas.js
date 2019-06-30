import React, { useRef, useEffect, useState } from "react";
import { CONVERTED_PIXEL_COUNT } from "../utility/pixelConstants";
import { forwardPropagation } from "../utility/ForwardPropagation";

const OutputCanvas = ({ scaledImage, inputVector, thetaMatrices }) => {
  const [prediction, setPrediction] = useState([0,0,0,0,0,0,0,0,0,0]);
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
    if (inputVector) {
      const test = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2980392156862745,0.3333333333333333,0.3333333333333333,0.3333333333333333,0.3372549019607843,0.3333333333333333,0.3333333333333333,0.1098039215686274,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.02745098039215686,0.2235294117647059,0.7764705882352941,0.9647058823529412,0.9882352941176471,0.9882352941176471,0.9882352941176471,0.9921568627450981,0.9882352941176471,0.9882352941176471,0.7803921568627451,0.09803921568627451,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1490196078431373,0.6980392156862745,0.9882352941176471,0.9921568627450981,0.9882352941176471,0.9019607843137255,0.8745098039215686,0.5686274509803921,0.8823529411764706,0.9764705882352941,0.9882352941176471,0.9882352941176471,0.5019607843137255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.1882352941176471,0.6470588235294118,0.9882352941176471,0.9882352941176471,0.7450980392156863,0.4392156862745098,0.09803921568627451,0,0,0,0.5725490196078431,0.9882352941176471,0.9882352941176471,0.9882352941176471,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2,0.9333333333333333,0.9921568627450981,0.9411764705882353,0.2470588235294118,0,0,0,0,0,0,0.1882352941176471,0.8980392156862745,0.9921568627450981,0.9921568627450981,0,0,0,0,0,0,0,0,0,0,0,0.0392156862745098,0.6392156862745098,0.9333333333333333,0.9882352941176471,0.9137254901960784,0.2784313725490196,0,0,0,0,0,0,0,0.1137254901960784,0.8431372549019608,0.9882352941176471,0.9882352941176471,0,0,0,0,0,0,0,0,0,0,0,0.2352941176470588,0.9882352941176471,0.9921568627450981,0.9882352941176471,0.8156862745098039,0.07450980392156863,0,0,0,0,0,0,0,0.3333333333333333,0.9882352941176471,0.9882352941176471,0.5529411764705883,0,0,0,0,0,0,0,0,0,0,0.2117647058823529,0.8784313725490196,0.9882352941176471,0.9921568627450981,0.7019607843137254,0.3294117647058823,0.1098039215686274,0,0,0,0,0,0,0,0.6980392156862745,0.9882352941176471,0.9137254901960784,0.1450980392156863,0,0,0,0,0,0,0,0,0,0.1882352941176471,0.8901960784313725,0.9882352941176471,0.9882352941176471,0.7450980392156863,0.04705882352941176,0,0,0,0,0,0,0,0,0,0.8823529411764706,0.9882352941176471,0.5686274509803921,0,0,0,0,0,0,0,0,0,0.2,0.9333333333333333,0.9921568627450981,0.9921568627450981,0.9921568627450981,0.4470588235294118,0.2941176470588235,0,0,0,0,0,0,0,0,0.4470588235294118,0.9921568627450981,0.7686274509803922,0,0,0,0,0,0,0,0,0,0,0.6235294117647059,0.9882352941176471,0.9882352941176471,0.9882352941176471,0.9882352941176471,0.9921568627450981,0.4745098039215686,0,0,0,0,0,0,0,0.1882352941176471,0.9333333333333333,0.8745098039215686,0.5098039215686274,0,0,0,0,0,0,0,0,0,0,0.9921568627450981,0.9882352941176471,0.9372549019607843,0.792156862745098,0.9882352941176471,0.8941176470588236,0.08235294117647059,0,0,0,0,0,0,0.02745098039215686,0.6470588235294118,0.9921568627450981,0.6549019607843137,0,0,0,0,0,0,0,0,0,0,0,0.6235294117647059,0.9882352941176471,0.9137254901960784,0.3294117647058823,0.3764705882352941,0.1843137254901961,0,0,0,0,0,0,0.02745098039215686,0.5137254901960784,0.9882352941176471,0.6352941176470588,0.2196078431372549,0,0,0,0,0,0,0,0,0,0,0,0.196078431372549,0.9294117647058824,0.9882352941176471,0.9882352941176471,0.7411764705882353,0.3098039215686275,0,0,0,0,0,0,0.5294117647058824,0.9882352941176471,0.6784313725490196,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2235294117647059,0.9921568627450981,0.9921568627450981,1,0.9921568627450981,0.9921568627450981,0.9921568627450981,0.9921568627450981,1,0.9921568627450981,0.9921568627450981,0.8823529411764706,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.02352941176470588,0.4784313725490196,0.6549019607843137,0.6588235294117647,0.9529411764705882,0.9882352941176471,0.9882352941176471,0.9882352941176471,0.9921568627450981,0.9882352941176471,0.7294117647058823,0.2784313725490196,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.196078431372549,0.6470588235294118,0.7647058823529411,0.7647058823529411,0.7686274509803922,0.5803921568627451,0.04705882352941176,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      setPrediction(forwardPropagation(test, thetaMatrices));
    }
  }, [scaledImage, inputVector, thetaMatrices]);

  return (
    <>
      <canvas ref={digitCanvas} style={{ width: 28, height: 28 }} />      
      <h1>
      <p className="text-3xl">{prediction.indexOf(Math.max(...prediction))+1}</p>
        {prediction.map((e, index) => {
          return (
            <div key={index}>
              Digit {index}: {e}
            </div>
          );
        })}
      </h1>
    </>
  );
};

export default OutputCanvas;
