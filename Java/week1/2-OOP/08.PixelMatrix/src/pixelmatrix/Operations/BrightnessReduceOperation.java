package pixelmatrix.Operations;

import pixelmatrix.Pixel;

public class BrightnessReduceOperation implements MatrixOperation {
    private double multiplyConstant;

    public BrightnessReduceOperation(double multiplyConstant) {
        this.setMultiplyConstant(multiplyConstant);
    }

    @Override
    public Pixel withPixel(int row, int col, Pixel[][] matrix) {
        Pixel pixel = matrix[row][col];
        int r = (int) (pixel.getR() * this.getMultiplyConstant());
        int g = (int) (pixel.getG() * this.getMultiplyConstant());
        int b = (int) (pixel.getB() * this.getMultiplyConstant());

        return new Pixel(r, g, b);
    }

    public double getMultiplyConstant() {
        return multiplyConstant;
    }

    public void setMultiplyConstant(double multiplyConstant) {
        if (multiplyConstant < 0.0 || multiplyConstant > 1.0) {
            throw new IllegalArgumentException("Multiply constant must be between 0 - 1");
        }

        this.multiplyConstant = multiplyConstant;
    }

}
