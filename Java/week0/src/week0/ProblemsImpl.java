package week0;

import java.util.Arrays;
import java.util.stream.IntStream;

public class ProblemsImpl implements Problems {

    @Override
    public boolean isOdd(int number) {
        return (number % 2) != 0;
    }

    @Override
    public boolean isPrime(int number) {
        double numberSqrt = Math.sqrt(number);

        for (int currentNumber = 2; currentNumber <= numberSqrt; currentNumber++) {
            if ((number % currentNumber) == 0) {
                return false;
            }
        }

        return true;
    }

    @Override
    public int min(int... array) {
        int minNumber = Integer.MAX_VALUE;

        for (int currentNumber : array) {
            if (currentNumber < minNumber) {
                minNumber = currentNumber;
            }
        }

        return minNumber;
    }

    @Override
    public int kthMin(int k, int[] array) {
        Arrays.sort(array);

        return quickSelect(array, 0, array.length - 1, k);
    }

    private int quickSelect(int[] array, int leftIndex, int rightIndex, int k) {
        if (leftIndex == rightIndex) {
            return array[leftIndex];
        }

        int pivotIndex = randomPartition(array, leftIndex, rightIndex);
        int sizeLeft = pivotIndex - leftIndex + 1;

        if (sizeLeft == k) {
            return array[pivotIndex];
        } else if (sizeLeft > k) {
            return quickSelect(array, leftIndex, pivotIndex - 1, k);
        } else {
            return quickSelect(array, pivotIndex + 1, rightIndex, k - sizeLeft);
        }
    }

    /**
     * Partions the array around a pivot so that
     * all elements left of the pivot will be less than the pivot
     * and all elements right of the pivot will be greater than the pivot
     *
     * @param array      The array of numbers
     * @param leftIndex  Sublist left most index
     * @param rightIndex Sublist right most index
     * @return Pivot index
     */
    private static int randomPartition(int[] array, int leftIndex, int rightIndex) {
        int pivotIndex = medianOf3(array, leftIndex, rightIndex);
        int pivotValue = array[pivotIndex];
        int storeIndex = leftIndex;

        swap(array, pivotIndex, rightIndex);

        for (int i = leftIndex; i < rightIndex; i++) {
            if (array[i] <= pivotValue) {
                swap(array, i, storeIndex);
                storeIndex++;
            }
        }

        swap(array, rightIndex, storeIndex);

        return storeIndex;
    }

    /**
     * Finds the median index and rearranges the array
     * so that left, middle and right will be in increasing order
     *
     * @param array      The array of numbers
     * @param leftIndex  Sublist left most index
     * @param rightIndex Sublist right most index
     * @return The index of the median value
     */
    private static int medianOf3(int[] array, int leftIndex, int rightIndex) {
        int middleIndex = (leftIndex + rightIndex) / 2;

        if (array[leftIndex] > array[rightIndex]) {
            swap(array, leftIndex, middleIndex);
        }

        if (array[leftIndex] > array[rightIndex]) {
            swap(array, leftIndex, rightIndex);
        }

        if (array[middleIndex] > array[rightIndex]) {
            swap(array, middleIndex, rightIndex);
        }

        swap(array, middleIndex, rightIndex - 1);

        return rightIndex - 1;
    }

    private static void swap(int[] array, int index1, int index2) {
        int temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }

    @Override
    public float getAverage(int[] array) {
        return (float) IntStream.of(array).sum() / array.length;
    }

    @Override
    public long getSmallestMultiple(int upperBound) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public long getLargestPalindrome(long N) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public int[] histogram(short[][] image) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public long doubleFac(int n) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public long kthFac(int k, int n) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public int getOddOccurrence(int[] array) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public long pow(int a, int b) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public long maximalScalarSum(int[] a, int[] b) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public int maxSpan(int[] array) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public boolean canBalance(int[] array) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public int[][] rescale(int[][] original, int newWidth, int newHeight) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String reverseMe(String argument) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String copyEveryChar(String input, int k) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String reverseEveryWord(String arg) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean isPalindrome(String argument) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isPalindrome(int number) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public int getPalindromeLength(String input) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public int countOcurrences(String needle, String haystack) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public String decodeURL(String input) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public int sumOfNumbers(String input) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public boolean areAnagrams(String A, String B) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean hasAnagramOf(String string, String string2) {
        // TODO Auto-generated method stub
        return false;
    }

}