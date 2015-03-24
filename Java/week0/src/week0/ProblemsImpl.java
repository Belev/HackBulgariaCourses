package week0;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
        long[] startArray = new long[upperBound];

        for (int i = 0; i < upperBound; i++) {
            startArray[i] = i + 1;
        }
        return findLeastCommonMultipleOfArray(startArray);
    }

    private long findLeastCommonMultipleOfArray(long[] array) {

        while (array.length > 1) {
            long[] temp = new long[getTempArrayLength(array.length)];
            int tempIndex = 0;

            for (int i = 0; i < array.length - 1; i += 2) {
                temp[tempIndex] += findLeastCommonMultiple(array[i], array[i + 1]);
                tempIndex++;
            }

            boolean hasAloneElement = (array.length % 2) != 0;
            if (hasAloneElement) {
                temp[tempIndex] = array[array.length - 1];
            }

            array = temp;
        }

        return array[0];
    }

    private int getTempArrayLength(int arrayLength) {
        return (arrayLength / 2) + (arrayLength % 2);
    }

    private long findLeastCommonMultiple(long a, long b) {
        return (a * b) / findGreatestCommonDivisor(a, b);
    }

    private long findGreatestCommonDivisor(long a, long b) {
        if (b == 0) {
            return a;
        }

        return findGreatestCommonDivisor(b, a % b);
    }

    @Override
    public long getLargestPalindrome(long N) {
        // TODO Auto-generated method stub
        // think of better solution then checking each number
        return 0;
    }

    @Override
    public int[] histogram(short[][] image) {
        int[] histogram = new int[256];

        for (int row = 0; row < image.length; row++) {
            for (int col = 0; col < image[row].length; col++) {
                int value = image[row][col];

                histogram[value]++;
            }
        }

        return histogram;
    }

    @Override
    public long doubleFac(int n) {
        return calculateFactorial(calculateFactorial(n));
    }

    private long calculateFactorial(long n) {
        long factorial = 1;

        while (n > 1) {
            factorial *= n;
            n--;
        }

        return factorial;
    }

    @Override
    public long kthFac(int k, int n) {
        long kthFactorial = n;

        for (int i = 0; i < k; i++) {
            kthFactorial = calculateFactorial(kthFactorial);
        }

        return kthFactorial;
    }

    @Override
    public int getOddOccurrence(int[] array) {
        Map<Integer, Integer> occurrences = new HashMap<Integer, Integer>();

        for (Integer currentNumber : array) {
            if (occurrences.containsKey(currentNumber)) {
                occurrences.put(currentNumber, occurrences.get(currentNumber) + 1);
            } else {
                occurrences.put(currentNumber, 1);
            }
        }

        for (Map.Entry<Integer, Integer> occurrence : occurrences.entrySet()) {
            if (occurrence.getValue() % 2 != 0) {
                return occurrence.getKey();
            }
        }

        return 0;
    }

    @Override
    public long pow(int a, int b) {
        if (b == 0) {
            return 1;
        }

        long temp = pow(a, b / 2);

        if (b % 2 == 0) {
            return temp * temp;
        } else {
            if (b > 0) {
                return a * temp * temp;
            } else {
                return (temp * temp) / a;
            }
        }
    }

    @Override
    public long maximalScalarSum(int[] a, int[] b) {
        Arrays.sort(a);
        Arrays.sort(b);
        long scalarSum = 0;

        for (int index = 0; index < a.length; index++) {
            scalarSum += a[index] * b[index];
        }

        return scalarSum;
    }

    @Override
    public int maxSpan(int[] array) {
        int maxSpan = 0;
        Map<Integer, Integer> numbersFirstOccurence = new HashMap<Integer, Integer>();

        for (int index = 0; index < array.length; index++) {
            int currentNumber = array[index];

            if (numbersFirstOccurence.containsKey(currentNumber)) {
                int currentSpan = index - numbersFirstOccurence.get(currentNumber) + 1;

                if (currentSpan > maxSpan) {
                    maxSpan = currentSpan;
                }
            } else {
                numbersFirstOccurence.put(currentNumber, index);
            }
        }

        return maxSpan;
    }

    @Override
    public boolean canBalance(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            int[] leftSide = Arrays.copyOfRange(array, 0, i + 1);
            int[] rightSide = Arrays.copyOfRange(array, i + 1, array.length);

            if (IntStream.of(leftSide).sum() == IntStream.of(rightSide).sum()) {
                return true;
            }
        }

        return false;
    }

    @Override
    public int[][] rescale(int[][] original, int newWidth, int newHeight) {
        int rowScale = original.length / newHeight;
        int colScale = original[0].length / newWidth;

        int[][] rescaled = new int[newWidth][newHeight];

        for (int row = 0; row < newWidth; row++) {
            for (int col = 0; col < newHeight; col++) {
                rescaled[row][col] = original[row * rowScale][col * colScale];
            }
        }

        return rescaled;
    }

    @Override
    public String reverseMe(String argument) {
        return new StringBuilder(argument).reverse().toString();
    }

    @Override
    public String copyEveryChar(String input, int k) {
        StringBuilder result = new StringBuilder();

        for (char symbol : input.toCharArray()) {
            result.append(new String(new char[k]).replace('\u0000', symbol));
        }

        return result.toString();
    }

    @Override
    public String reverseEveryWord(String arg) {
        String[] words = arg.split(" ");
        StringBuilder withReversedWords = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            withReversedWords.append(reverseMe(words[i]));

            if (i != words.length - 1) {
                withReversedWords.append(" ");
            }
        }

        return withReversedWords.toString();
    }

    @Override
    public boolean isPalindrome(String argument) {
        char[] asCharArray = argument.toCharArray();
        int length = asCharArray.length;

        for (int i = 0; i < length / 2; i++) {
            if (asCharArray[i] != asCharArray[length - i - 1]) {
                return false;
            }
        }

        return true;
    }

    @Override
    public boolean isPalindrome(int number) {
        return isPalindrome(String.valueOf(number));
    }

    @Override
    public int getPalindromeLength(String input) {
        int palindromeLength = 0;
        int starIndex = input.indexOf('*');
        int inputLength = input.length();
        char[] asCharArray = input.toCharArray();

        for (int i = 0; i < starIndex; i++) {
            int leftIndex = starIndex - i - 1;
            int rightIndex = inputLength - starIndex + i;

            if (asCharArray[leftIndex] == asCharArray[rightIndex]) {
                palindromeLength++;
            } else {
                break;
            }
        }

        return palindromeLength;
    }

    @Override
    public int countOcurrences(String needle, String haystack) {
        return haystack.split(needle).length - 1;
    }

    @Override
    public String decodeURL(String input) throws UnsupportedEncodingException {
        return java.net.URLDecoder.decode(input, "UTF-8");
    }

    @Override
    public int sumOfNumbers(String input) {
        // -? - matches with or without minus sign
        // \d+ - matches one or more digits
        Pattern numbersPattern = Pattern.compile("-?\\d+");
        Matcher numbersAsStrings = numbersPattern.matcher(input);
        int sumOfNumbers = 0;

        while (numbersAsStrings.find()) {
            sumOfNumbers += Integer.valueOf(numbersAsStrings.group());
        }

        return sumOfNumbers;
    }

    @Override
    public boolean areAnagrams(String A, String B) {
        if (A.length() != B.length()) {
            return false;
        }

        boolean[] usedSymbols = getUsedSymbolsArray(A);
        char[] bAsCharArray = B.toCharArray();

        for (int i = 0; i < bAsCharArray.length; i++) {
            int symbolValue = (int) bAsCharArray[i];

            if (!usedSymbols[symbolValue]) {
                return false;
            }
        }

        return true;
    }

    @Override
    public boolean hasAnagramOf(String string, String string2) {
        boolean[] usedSymbols = getUsedSymbolsArray(string);
        char[] secondStringAsCharArray = string2.toCharArray();
        int currentLength = 0;
        int wantedLength = string.length();

        for (int i = 0; i < secondStringAsCharArray.length; i++) {
            int symbolValue = (int) secondStringAsCharArray[i];

            if (usedSymbols[symbolValue]) {
                currentLength++;

                if (currentLength == wantedLength) {
                    return true;
                }
            } else {
                if (currentLength == wantedLength) {
                    return true;
                } else {
                    currentLength = 0;
                }
            }
        }

        return currentLength == wantedLength;
    }

    private boolean[] getUsedSymbolsArray(String text) {
        boolean[] usedSymbols = new boolean[256];
        char[] asCharArray = text.toCharArray();

        for (int i = 0; i < asCharArray.length; i++) {
            int symbolValue = (int) asCharArray[i];
            usedSymbols[symbolValue] = true;
        }

        return usedSymbols;
    }
}
