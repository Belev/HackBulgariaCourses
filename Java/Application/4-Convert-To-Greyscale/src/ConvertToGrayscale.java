import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Scanner;

import javax.imageio.ImageIO;

public class ConvertToGrayscale {
    private static final double LUMINOSITY_RED_FACTOR = 0.21;
    private static final double LUMINOSITY_GREEN_FACTOR = 0.72;
    private static final double LUMINOSITY_BLUE_FACTOR = 0.07;

    private static void convertImageToGrayscale(String imagePath) throws IOException {
        BufferedImage image = ImageIO.read(new File(imagePath));
        String imageExtension = getImageExtension(imagePath);

        int width = image.getWidth();
        int height = image.getHeight();

        int currentPixel = 0;
        int alpha = 0;
        int r = 0;
        int g = 0;
        int b = 0;
        int pixelValue = 0;
        int argb = 0;

        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                currentPixel = image.getRGB(i, j);

                alpha = (currentPixel >> 24) & 255;
                r = (int) (((currentPixel >> 16) & 255) * LUMINOSITY_RED_FACTOR);
                g = (int) (((currentPixel >> 8) & 255) * LUMINOSITY_GREEN_FACTOR);
                b = (int) (((currentPixel) & 255) * LUMINOSITY_BLUE_FACTOR);

                pixelValue = r + g + b;
                argb = (alpha << 24) | (pixelValue << 16) | (pixelValue << 8) | pixelValue;

                image.setRGB(i, j, argb);
            }
        }

        ImageIO.write(image, imageExtension, new File(getGrayscaleImagePath(imagePath, imageExtension)));

    }

    private static String getImageExtension(String imagePath) {
        return imagePath.substring(imagePath.lastIndexOf(".") + 1);
    }

    private static String getGrayscaleImagePath(String imagePath, String imageExtension) {
        return imagePath.substring(0, imagePath.lastIndexOf(".")) + "-grayscale." + imageExtension;
    }

    public static void main(String[] args) throws IOException {
        Scanner input = new Scanner(System.in);
        
        String imagePath = input.nextLine();
        input.close();
        
        convertImageToGrayscale(imagePath);
        
//        Test with the images in images folder.
//        String johnRomeroPath = "./images/john-romero.jpg";
//        convertImageToGrayscale(johnRomeroPath);
//        
//        String linuxPenguinPath = "./images/linux-penguin.png";
//        convertImageToGrayscale(linuxPenguinPath);
//        
//        String logoPath = "./images/logo.bmp";
//        convertImageToGrayscale(logoPath);
    }
}