# Digit Predictor

Write a number in the input field and see if the neural network can identify which digit you were trying to write.

The original network was created with high accuracy in mind. Dropout was used for regularization, leaky RELU for activation, and the hidden layer consisted of 4096 nodes each. This achieved 98.02% accuracy on the cross-validation set. For this app, however, fewer parameters were a necessity to achieve instant predictions. Therefore, the dropout mask was omitted and only 50 units per hidden layer used producing an accuracy of 90%o on the CV set.
