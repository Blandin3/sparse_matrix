const fs = require('fs');
const path = require('path');
const SparseMatrix = require('./sparseMatrix');

// Create results directory if it doesn't exist
const resultsDir = path.join(__dirname, 'results');
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
}

// Function to read and parse matrix from file
function readMatrixFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matrix = new SparseMatrix();
    matrix.loadFromString(content);
    return matrix;
}

// Function to save matrix result to file
function saveMatrixToFile(matrix, resultPath) {
    if (matrix === null) {
        console.error('Operation resulted in null matrix. Skipping file save.');
        return;
    }
    const fullPath = path.join(resultsDir, `${resultPath}.txt`);
    // Remove existing file if it exists
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
    fs.writeFileSync(fullPath, matrix.toString());
    console.log(`${resultPath} result saved to: ${fullPath}`);
}

// Example usage with sample files
const matrix1 = readMatrixFromFile('./sample_input_for_students/easy_sample_01_2.txt');
const matrix2 = readMatrixFromFile('./sample_input_for_students/easy_sample_01_3.txt');

// Perform matrix operations and save results
console.log('Processing operations...');

try {
    // Addition
    console.log('Performing addition...');
    const additionResult = matrix1.add(matrix2);
    saveMatrixToFile(additionResult, 'addition');

    // Subtraction
    console.log('Performing subtraction...');
    const subtractionResult = matrix1.subtract(matrix2);
    saveMatrixToFile(subtractionResult, 'subtraction');

    // Multiplication
    console.log('Performing multiplication...');
    const multiplicationResult = matrix1.multiply(matrix2);
    saveMatrixToFile(multiplicationResult, 'multiplication');

    // Transposition (for matrix1)
    console.log('Performing transposition...');
    const transpositionResult = matrix1.transpose();
    saveMatrixToFile(transpositionResult, 'transposition');

    console.log('All operations completed successfully.');
} catch (error) {
    console.error('Error during matrix operations:', error.message);
}

console.log('All operations completed. Results saved in the results directory.');