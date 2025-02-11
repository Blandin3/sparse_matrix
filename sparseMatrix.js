class SparseMatrix {
    constructor() {
        this.rows = 0;
        this.cols = 0;
        this.elements = new Map();
    }

    // Load matrix from file content
    loadFromString(content) {
        const lines = content.trim().split('\n');
        
        // Parse dimensions
        this.rows = parseInt(lines[0].split('=')[1]);
        this.cols = parseInt(lines[1].split('=')[1]);
        
        // Parse elements
        for (let i = 2; i < lines.length; i++) {
            const match = lines[i].match(/\((\d+),\s*(\d+),\s*(-?\d+)\)/);
            if (match) {
                const row = parseInt(match[1]);
                const col = parseInt(match[2]);
                const value = parseInt(match[3]);
                this.set(row, col, value);
            }
        }
    }

    // Set value at position
    set(row, col, value) {
        // Update dimensions if necessary
        this.rows = Math.max(this.rows, row + 1);
        this.cols = Math.max(this.cols, col + 1);
        
        const key = `${row},${col}`;
        if (value === 0) {
            this.elements.delete(key);
        } else {
            this.elements.set(key, value);
        }
    }

    // Get value at position
    get(row, col) {
        const key = `${row},${col}`;
        return this.elements.get(key) || 0;
    }

    // Add two matrices
    add(other) {
        const result = new SparseMatrix();
        result.rows = Math.max(this.rows, other.rows);
        result.cols = Math.max(this.cols, other.cols);

        // Add elements from this matrix
        for (const [key, value] of this.elements) {
            const [row, col] = key.split(',').map(Number);
            result.set(row, col, value);
        }

        // Add elements from other matrix
        for (const [key, value] of other.elements) {
            const [row, col] = key.split(',').map(Number);
            const currentValue = result.get(row, col);
            result.set(row, col, currentValue + value);
        }

        return result;
    }

    // Subtract two matrices
    subtract(other) {
        const result = new SparseMatrix();
        result.rows = Math.max(this.rows, other.rows);
        result.cols = Math.max(this.cols, other.cols);

        // Add elements from this matrix
        for (const [key, value] of this.elements) {
            const [row, col] = key.split(',').map(Number);
            result.set(row, col, value);
        }

        // Subtract elements from other matrix
        for (const [key, value] of other.elements) {
            const [row, col] = key.split(',').map(Number);
            const currentValue = result.get(row, col);
            result.set(row, col, currentValue - value);
        }

        return result;
    }

    // Multiply two matrices
    multiply(other) {
        // Check if matrices can be multiplied
        if (this.cols !== other.rows) {
            console.warn(`Warning: Matrix dimensions are not compatible for multiplication: (${this.rows}x${this.cols}) * (${other.rows}x${other.cols})`);
            return null;
        }

        const result = new SparseMatrix();
        result.rows = this.rows;
        result.cols = other.cols;

        // For each non-zero element in this matrix
        for (const [key1, value1] of this.elements) {
            const [row1, col1] = key1.split(',').map(Number);
            
            // For each non-zero element in other matrix with matching row
            for (const [key2, value2] of other.elements) {
                const [row2, col2] = key2.split(',').map(Number);
                
                // Only process if the column of first matrix matches row of second matrix
                if (col1 === row2) {
                    const currentValue = result.get(row1, col2);
                    result.set(row1, col2, currentValue + value1 * value2);
                }
            }
        }

        // Save multiplication result to file
        const fs = require('fs');
        const path = require('path');
        const resultPath = path.join(__dirname, 'results', 'multiplication.txt');
        fs.writeFileSync(resultPath, result.toString());

        return result;
    }

    // Transpose the matrix
    transpose() {
        const result = new SparseMatrix();
        result.rows = this.cols;
        result.cols = this.rows;

        // For each non-zero element, swap its row and column in the result
        for (const [key, value] of this.elements) {
            const [row, col] = key.split(',').map(Number);
            result.set(col, row, value);
        }

        return result;
    }

    // Convert matrix to string representation
    toString() {
        let result = `rows=${this.rows}\ncols=${this.cols}\n`;
        for (const [key, value] of this.elements) {
            const [row, col] = key.split(',');
            result += `(${row}, ${col}, ${value})\n`;
        }
        return result.trim();
    }
}

module.exports = SparseMatrix;