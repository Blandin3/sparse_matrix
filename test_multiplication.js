const SparseMatrix = require('./sparseMatrix');

// Create first matrix
const matrix1 = new SparseMatrix();
matrix1.set(0, 0, 1);
matrix1.set(0, 1, 2);
matrix1.set(1, 0, 3);
matrix1.set(1, 1, 4);

// Create second matrix
const matrix2 = new SparseMatrix();
matrix2.set(0, 0, 5);
matrix2.set(0, 1, 6);
matrix2.set(1, 0, 7);
matrix2.set(1, 1, 8);

// Perform multiplication
const result = matrix1.multiply(matrix2);

// Display result in console
console.log('Multiplication Result:');
console.log(result.toString());