package week0;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Arrays;

import org.junit.Test;

public class ProblemsImplTests {
    private static final String NOT_IMPLEMENTED = "NOT IMPLEMENTED";
    private final Problems problems = ProblemsFactory.createProblemsInstance();

    private void notImplemented() {
        fail(NOT_IMPLEMENTED);
    }

    @Test
    public void testIsPrime() {
        assertTrue(problems.isPrime(5));
        assertTrue(problems.isPrime(7));
        assertTrue(problems.isPrime(41));
        assertTrue(problems.isPrime(3));
        assertTrue(!problems.isPrime(39));
    }

    @Test
    public void testIsOdd() {
        assertTrue(problems.isOdd(3));
        assertTrue(problems.isOdd(5));
        assertTrue(problems.isOdd(7));
        assertTrue(problems.isOdd(-1));
        assertTrue(problems.isOdd(-3));
        assertTrue(!problems.isOdd(0));
    }

    @Test
    public void testMin() {
        int min = problems.min(1, 3, 4, 5, 6, -1, 23, -125, 125125, -63262, 2151, -1212);
        assertTrue(min == -63262);

        min = problems.min(-1, 0, 1, 1, -1, -9, 0, 5);
        assertTrue(min == -9);
    }

    @Test
    public void testKthMin() {
        int testArr[] = new int[]{1, 2151, 125, 125, 1125, 16, 754, 132, 613, -51521, 51251, 675, 125366};
        Arrays.sort(testArr);

        assertTrue(testArr[0] == problems.kthMin(1, testArr));
        assertTrue(testArr[1] == problems.kthMin(2, testArr));
        assertTrue(testArr[2] == problems.kthMin(3, testArr));
    }

    @Test
    public void testGetAverage() {
        int testArr[] = new int[]{1, 2151, 125, 125, 1125, 16, 754, 132, 613, -51521, 51251, 675, 125366};

        float avg = 0;
        for (int i = 0; i < testArr.length; i++) {
            avg += testArr[i];
        }
        avg /= testArr.length;

        assertEquals(avg, problems.getAverage(testArr), 0.01f);
    }

    @Test
    public void testGetSmallestMultiple() {
        assertEquals(2520, problems.getSmallestMultiple(10));
        assertEquals(232792560, problems.getSmallestMultiple(20));

    }

    @Test
    public void testGetLargestPalindrome() {
        assertEquals(99, problems.getLargestPalindrome(100));
        assertEquals(99999, problems.getLargestPalindrome(100000));
        assertEquals(123321, problems.getLargestPalindrome(123456));
    }

    @Test
    public void testHistorgram() {
        final short[][] image = new short[10][10];
        assertEquals(100, problems.histogram(image)[0]);

        for (short i = 0; i < image.length; i++) {
            for (short j = 0; j < image[0].length; j++) {
                image[i][j] = (short) (i * image[0].length + j);
            }
        }

        assertEquals(1, problems.histogram(image)[13]);

        for (short i = 0; i < image.length; i++) {
            for (short j = 0; j < image[0].length; j++) {
                image[i][j] = (short) (i * j + j);
            }
        }
    }

    @Test
    public void testDoubleFac() {
        assertEquals(720, problems.doubleFac(3));
        assertEquals(2, problems.doubleFac(2));
    }

    @Test
    public void testKthFac() {
        assertEquals(3628800, problems.kthFac(1, 10));
        assertEquals(3628800 / 10, problems.kthFac(1, 9));
        testDoubleFac();
    }

    @Test
    public void testGetOddOccurrence() {
        int[] numbers = new int[]{1, 1, 3, 3, 6, 5, 4, 6, 5, 9, 1, 1, 3, 15, 4, 5, 9, 3, 15};
        assertEquals(5, problems.getOddOccurrence(numbers));
    }

    @Test
    public void testPow() {
        assertEquals(8, problems.pow(2, 3));
        assertEquals(-1, problems.pow(-1, 9));
        assertEquals(1, problems.pow(99, 0));

        assertEquals(-32, problems.pow(-2, 5));
        assertEquals(729, problems.pow(3, 6));
    }

    @Test
    public void testMaximalScalarSum() {
        int[] a = new int[]{1, 2, 3, 4, 5, 6};
        int[] b = new int[]{0, 0, 0, 0, 0, 0};

        assertEquals(0, problems.maximalScalarSum(a, b));
        b = new int[]{1, 1, 1, 1, 1, 1};

        assertEquals(21, problems.maximalScalarSum(a, b));

        b = new int[]{5, 4, 8, 9, -1, 2};
        assertEquals(129, problems.maximalScalarSum(a, b));

    }

    @Test
    public void testMaxSpan() {
        assertEquals(4, problems.maxSpan(new int[]{1, 2, 1, 1, 3}));
        assertEquals(6, problems.maxSpan(new int[]{1, 4, 2, 1, 4, 1, 4}));
        assertEquals(6, problems.maxSpan(new int[]{1, 4, 2, 1, 4, 4, 4}));
    }

    @Test
    public void testCanBalance() {
        assertTrue(problems.canBalance(new int[]{1, 1, 1, 2, 1}));
        assertFalse(problems.canBalance(new int[]{2, 1, 1, 2, 1}));
        assertTrue(problems.canBalance(new int[]{10, 10}));
    }

    @Test
    public void testRescale() {
        final int[][] original = new int[100][100];
        int counter = 0;
        for (int y = 0; y < original.length; y++) {
            for (int x = 0; x < original[0].length; x++) {
                original[y][x] = counter++;
            }
        }

        final int newWidth = 10;
        final int newHeight = 10;

        final int[][] newImage = problems.rescale(original, newWidth, newHeight);
        assertEquals(newImage[0][0], original[0][0]);
        assertEquals(newImage[9][9], original[90][90]);
        assertEquals(newImage[0][9], original[0][90]);
        assertEquals(newImage[9][0], original[90][0]);
    }

    @Test
    public void testStringReverse() {
        assertEquals("ytrewq", problems.reverseMe("qwerty"));
        assertEquals("How about", problems.reverseMe("tuoba woH"));
        assertEquals("   ", "   ");
        assertEquals("This is bad", problems.reverseMe(problems.reverseMe("This is bad")));
    }

    @Test
    public void testReverseWords() {
        assertEquals("tahW si siht", problems.reverseEveryWord("What is this"));
        assertEquals("yrevE drow si desrever", problems.reverseEveryWord("Every word is reversed"));
    }

    @Test
    public void testIsPalindrome() {
        assertEquals(true, problems.isPalindrome("radar"));
        assertEquals(false, problems.isPalindrome("Nixin"));
        assertEquals(false, problems.isPalindrome("Nikon"));
        assertEquals(true, problems.isPalindrome("Nobody ydoboN"));
        assertEquals(false, problems.isPalindrome("Nobody ydobom"));
    }

    @Test
    public void testIsPalindromeNumber() {
        assertEquals(true, problems.isPalindrome(191));
        assertEquals(false, problems.isPalindrome(1992));
        assertEquals(true, problems.isPalindrome(0x00));
    }

    @Test
    public void testCopyCharacter() {
        assertEquals("aaa", problems.copyEveryChar("a", 3));
        assertEquals("aabbaadd", problems.copyEveryChar("abad", 2));
        assertEquals("Wwhhaatt  tthhee  hheellll", problems.copyEveryChar("What the hell", 2));
    }

    @Test
    public void testPalindromStarLength() {
        assertEquals(2, problems.getPalindromeLength("taz*zad"));
        assertEquals(0, problems.getPalindromeLength("tad*zad"));
        assertEquals(3, problems.getPalindromeLength("tad*dat"));
    }

    @Test
    public void testNonOverlappingOccurrences() {
        assertEquals(0, problems.countOcurrences("demetrius", ""));
        assertEquals(2, problems.countOcurrences("ab", "abandon all hope, abandon this place!"));
        assertEquals(2, problems.countOcurrences("de", "deutschland uber alles, detonate all the allez"));
    }

    @Test
    public void testCopyEveryCharacter() {
        assertEquals("ttwwrr", problems.copyEveryChar("twr", 2));
        assertEquals("ttt   www   rrr", problems.copyEveryChar("t w r", 3));
    }

    @Test
    public void testDecodeUrl() {
        assertEquals("http://meyerweb.com/eric/tools/dencoder/", problems.decodeURL("http%3A%2F%2Fmeyerweb.com%2Feric%2Ftools%2Fdencoder%2F"));
        assertEquals("http://javarevisited.blogspot.com/2012/10/10-java-string-interview-question-answers-top.html", problems.decodeURL("http%3A%2F%2Fjavarevisited.blogspot.com%2F2012%2F10%2F10-java-string-interview-question-answers-top.html"));
    }


    @Test
    public void testSumOfIntegers() {
        assertEquals(999, problems.sumOfNumbers("999problemsButJavaAint0"));
        assertEquals(0, problems.sumOfNumbers("000 three five -1 1"));
        assertEquals(2, problems.sumOfNumbers("samir1WhatAreYou2Doing3You-4"));
    }

    @Test
    public void testAnagrams() {
        assertEquals(true, problems.areAnagrams("A", "A"));
        assertEquals(true, problems.areAnagrams("BRADE", "BEARD"));
        assertEquals(true, problems.areAnagrams("TOP CODER", "COTE PROD"));
        assertEquals(false, problems.areAnagrams("TOP CODER", "COTO PRODE"));

        // Грешен Unit test!
//        assertEquals(true, problems.areAnagrams("том месвролуко риддъл", "тук съм и лорд волдеморт"));
    }

    @Test
    public void testHasAnagramOf() {
        assertEquals(true, problems.hasAnagramOf("abc", "cbadfghhijh"));
        assertEquals(true, problems.hasAnagramOf("abcdef", "fedbcadh"));
        assertEquals(true, problems.hasAnagramOf("dirac", "libcarid"));
        assertEquals(false, problems.hasAnagramOf("abc", "cbda"));
    }
}