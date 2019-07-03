## Copyright (C) 2017 robin
## Author: robin <robin@XPS15>
## Created: 2017-05-30
## Modified: 2019-06-23

function [Theta1, Theta2, Theta3, accCV] = reluNN (X, Y, XCV, YCV, ...
												epoch, alpha, plotting)
	close all;
	% Network Architecture:
	% Number of hidden Layers: 2
	num_hidden_units = 100; % Number of hidden Units
	num_output_units = size(unique(Y), 1);
	num_input_units = size(X(:,1),1);
	m = size(X,2); % Number of trainings examples
	mm = size(XCV,2); % Number of CV examples
	batchSize = 100;
	baseAlpha = alpha;
  mask = 1;

	% Initialize Theta and bias to input matrix
	eps1 = sqrt(2/num_input_units);
	eps2 = sqrt(2/num_hidden_units);
	Theta1 = randn(num_hidden_units, num_input_units+1)*eps1; 
	Theta2 = randn(num_hidden_units, num_hidden_units+1)*eps2; 
	Theta3 = randn(num_output_units, num_hidden_units + 1)*eps2;

	X = [ones(1,m);X];
	XCV = [ones(1,mm);XCV];

	% Convert Y to a binary matrix
	YB = zeros(num_output_units, m);
	for i = 1:m,
		if Y(i) == 0, Y(i) = 10; end; % 10 = 0
		YB(Y(i),i) = 1;
	end;

	YCVB = zeros(num_output_units, mm);
	for i = 1:mm,
		if YCV(i) == 0, YCV(i) = 10; end; % 10 = 0
		YCVB(YCV(i),i) = 1;
	end;

	% Minibtach formulation
	miniBatchSize = 50;
	iterationsPerEpoch = m/miniBatchSize;
	
	% The Algorithm:
	 h = waitbar (0, '0.00%');
	for i = 1:epoch,
		for j = 1:iterationsPerEpoch,
			%Divide into batch
			XMB = X(:,(miniBatchSize*(j-1)+1):(j*miniBatchSize));
			YMB = YB(:,(miniBatchSize*(j-1)+1):(j*miniBatchSize));
			
			% Backward prop
			% Also pass in mask
			M1 = binornd(1, mask, num_hidden_units, miniBatchSize);
			M2 = binornd(1, mask, num_hidden_units, miniBatchSize);
			[D1, D2, D3] = reluBackProp(XMB, YMB, Theta1, Theta2, Theta3, M1, M2);
			% Gradient Descent:
			[Theta1, Theta2, Theta3] = gradDescent (Theta1, Theta2, Theta3, ...
											D1, D2, D3, alpha);

		end

		% alpha = baseAlpha * ((epoch)/((epoch) + i))
		% Some home-cooked variant of gradually decreasing alpha
		alpha = (-0.5*log(i) +2) * baseAlpha

		HCV = CVEstimateWithDO (XCV, Theta1*mask, Theta2*mask, Theta3*mask);
		accCV(i) = performance (HCV, YCV);		

		if plotting,
			xAxis = 1:1:i;
			plot(xAxis, accCV);
			hold on;
		end

		waitbar (i/epoch, h, sprintf ('%.2f%%', 100*(i/epoch)));

		printf("Epoch number: %d\n", i);
		fflush(stdout);

	end
	close(h);
endfunction

function [D1, D2, D3] = reluBackProp (X, YB, Theta1, Theta2, Theta3, M1, M2)

	if nargin == 5,
		M1 = 1;
		M2 = 1;
	end

	m = size(X,2);

	% Forward Prop
	[H, A1, A2] = reluForwardProp(X, Theta1, Theta2, Theta3, M1, M2);
			
	delta3 = H-YB; 
	D3 = (1/m)*(delta3*A2'); 
	delta2 = Theta3'*delta3.*reluDerivative(A2); 
	delta2 = delta2(2:end, :).*M1;
	D2 = (1/m)*(delta2*A1');
	delta1 = Theta2'*delta2.*reluDerivative(A1);
	delta1 = delta1(2:end, :).*M2;
	D1 = (1/m)*(delta1*X');

endfunction

function [H, A1, A2] = reluForwardProp (X, Theta1, Theta2, Theta3, M1, M2)

	if nargin == 4,
		M1 = 1;
		M2 = 1;
	end

	A1 = relu(Theta1*X).*M1; 
	A1 = [ones(1,size(A1,2));A1]; 
	A2 = relu(Theta2*A1).*M2;
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

function H = CVEstimateWithDO (X, Theta1, Theta2, Theta3)

  A1 = relu(Theta1*X); 
  A1 = [ones(1,size(A1,2));A1]; 
  A2 = relu(Theta2*A1);
  A2 = [ones(1,size(A2,2));A2];
  H = softmax(Theta3*A2); 

endfunction

function [Theta1, Theta2, Theta3] = gradDescent (Theta1, Theta2, Theta3, D1, D2, D3, alpha)

  Theta1 = Theta1 - alpha*D1;
  Theta2 = Theta2 - alpha*D2;
  Theta3 = Theta3 - alpha*D3;

endfunction

function acc = performance (H, Y)

  [null, predicted_digit] = max(H);
  acc = mean(predicted_digit' == Y);

endfunction

function [R] = reluDerivative (z)

  R = (z>=0);
  R = double(R);
  R(find(R==0)) = 0.01;

endfunction

