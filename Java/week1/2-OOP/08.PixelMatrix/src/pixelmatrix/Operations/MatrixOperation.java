package pixelmatrix.Operations;

import pixelmatrix.Pixel;

public interface MatrixOperation {
    Pixel withPixel(int row, int col, Pixel[][] matrix);
}
