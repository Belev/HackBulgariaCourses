package pixelmatrix.Operations;

import pixelmatrix.Pixel;

public class GrayscaleOperation implements MatrixOperation {

    @Override
    public Pixel withPixel(int row, int col, Pixel[][] matrix) {
        Pixel pixel = matrix[row][col];

        int gray = (pixel.getR() + pixel.getG() + pixel.getB()) / 3;

        return new Pixel(gray, gray, gray);
    }

}
