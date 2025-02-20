# Sparse Matrix Operations

This project implements a sparse matrix data structure and operations in JavaScript. It provides efficient storage and manipulation of matrices where most elements are zero.

## Getting Started

### Prerequisites
- Node.js installed on your system
- Git for version control

### Repository Access
Clone the repository using:
```bash
git clone https://github.com/Blandin3/sparse_matrix.git
```

## Features

- Sparse matrix representation using Map data structure
- Matrix addition
- Matrix subtraction
- Matrix multiplication
- Matrix transposition
- File-based input/output
- Memory-efficient storage for sparse matrices

## Implementation Details
### Sparse Matrix Structure

The sparse matrix is implemented using a Map data structure that only stores non-zero elements. Each element is stored with a key in the format `row,col` and its corresponding value.

### Supported Operations

1. **Matrix Addition**
   - Adds corresponding elements of two matrices
   - Handles matrices of different dimensions by extending to the larger dimension
   - Only stores non-zero results

2. **Matrix Subtraction**
   - Subtracts corresponding elements of two matrices
   - Handles matrices of different dimensions by extending to the larger dimension
   - Only stores non-zero results

3. **Matrix Multiplication**
   - Performs standard matrix multiplication
   - Optimized for sparse matrices by only processing non-zero elements
   - Returns a zero matrix if dimensions are incompatible

4. **Matrix Transposition**
   - Swaps rows and columns of the matrix
   - Preserves sparsity by only processing non-zero elements
   - Creates a new matrix with dimensions reversed

## File Format

Input matrices should be in the following format:
```
rows=<number_of_rows>
cols=<number_of_columns>
(<row>, <col>, <value>)
(<row>, <col>, <value>)
...
```

Example:
```
rows=3
cols=3
(0, 0, 1)
(1, 1, 2)
(2, 2, 3)
```

## Usage

1. Create a new sparse matrix:
```javascript
const matrix = new SparseMatrix();
```

2. Load matrix from file:
```javascript
const matrix = readMatrixFromFile('path/to/matrix/file.txt');
```

3. Perform operations:
```javascript
// Addition
const sum = matrix1.add(matrix2);

// Subtraction
const difference = matrix1.subtract(matrix2);

// Multiplication
const product = matrix1.multiply(matrix2);

// Transposition
const transposed = matrix1.transpose();
```

## Running the Tests

To run the example test file:
```bash
node test.js
```

This will load sample matrices and demonstrate addition and multiplication operations.

## Implementation Notes

- The implementation automatically handles sparse matrices of different sizes
- Zero elements are not stored in memory
- Matrix dimensions are dynamically updated when setting elements
- Operations are optimized to work only with non-zero elements

## Error Handling

- Matrix multiplication returns a zero matrix if dimensions are incompatible
- File parsing includes validation for the correct format
- Invalid input formats are handled gracefully

## Performance Considerations

- Space Complexity: O(N) where N is the number of non-zero elements
- Addition Time Complexity: O(N1 + N2) where N1 and N2 are the number of non-zero elements in each matrix
- Multiplication Time Complexity: O(N1 * N2) in the worst case, but typically better for sparse matrices