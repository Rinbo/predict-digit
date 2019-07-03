function H = test (X, Theta1, Theta2, Theta3)

  A1 = relu(Theta1*X);
  A1 = [ones(1,size(A1,2));A1]; 
  A2 = relu(Theta2*A1);
  A2 = [ones(1,size(A2,2));A2];
  H = softmax(Theta3*A2); 

endfunction

function [R] = relu (z)

  R = max(z,0);
  k = find(R==0);
  R(k) = z(k)*0.01;
 
endfunction

function [SM] = softmax (Z)

  % Modified softmax to avoid numerical underflow:
  Z = Z-max(Z);
  Z = exp(Z);
  SM = Z./sum(Z);

endfunction