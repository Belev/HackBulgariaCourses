package pixelmatrix;

import java.security.InvalidParameterException;

import pixelmatrix.Operations.MatrixOperation;

public class Matrix {
    private Pixel[][] matrix;

    public Matrix(int rows, int cols) {
        this.setMatrix(this.createZeroPixelMatrix(rows, cols));
    }

    public Pixel[][] getMatrix() {
        return matrix;
    }

    public void setMatrix(Pixel[][] matrix) {
        this.matrix = matrix;
    }

    public Pixel getPixel(int row, int col) {
        if (this.isValidPosition(row, col)) {
            return this.matrix[row][col];
        } else {
            throw new InvalidParameterException("The given position is outside the pixel matrix.");
        }
    }

    public void setPixel(int row, int col, Pixel pixel) {
        if (this.isValidPosition(row, col)) {
            this.matrix[row][col] = pixel;
        } else {
            throw new InvalidParameterException("The given position is outside the pixel matrix.");
        }
    }

    public void operate(MatrixOperation operation) {
        for (int row = 0; row < matrix.length; ++row) {
            for (int col = 0; col < matrix[0].length; ++col) {
                this.setPixel(row, col, operation.withPixel(row, col, matrix));
            }
        }
    }

    private boolean isValidPosition(int row, int col) {
        return row >= 0 && row < this.matrix.length && col >= 0 && col < this.matrix[0].length;
    }

    private Pixel[][] createZeroPixelMatrix(int rows, int cols) {
        Pixel[][] zeroMatrix = new Pixel[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                zeroMatrix[i][j] = new Pixel(0, 0, 0);
            }
        }

        return zeroMatrix;
    }
}
