export const forwardPropagation = (inputVector, matrices) => {
  return { inputVector, matrices };

  /*
   * Forward prop for network trained with dropout
   *
   * A1 = relu(Theta1*X);
   * A1 = [ones(1,size(A1,2));A1];
   * A2 = relu(Theta2*A1);
   * A2 = [ones(1,size(A2,2));A2];
   * H = softmax(Theta3*A2);
   */

  // Step 1: Define relu
  // Step 2: Define matrix multiplication algoritm
  // Step 3: Define softmax function
};
