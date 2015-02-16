import java.util.Scanner;

public class SmallestSubstringContainingTheAlphabet {
    private static final int SYMBOLS_IN_ASCII__TABLE_COUNT = 256;
    private static final String ENGLISH_ALPHABET_LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";

    public static String findSmallestSubstringContainingTheEnglishAlphabet(String text, String lettersWhichShouldBeFound) {
        int minSubstringBegin = -1;
        int minSubstringEnd = -1;
        int minSubstringLength = text.length() + 1;

        String lowerCaseText = text.toLowerCase();

        int[] symbolsToFind = getSymbolsToFindAsArray(ENGLISH_ALPHABET_LOWER_CASE);
        int[] foundSymbols = new int[SYMBOLS_IN_ASCII__TABLE_COUNT];
        int foundSymbolsCount = 0;
        int symbolIndex = -1;
        int beginIndex = 0;

        for (int currentIndex = 0; currentIndex < lowerCaseText.length(); currentIndex++) {
            symbolIndex = (int) lowerCaseText.charAt(currentIndex);

            // skip symbols which are not needed
            if (symbolsToFind[symbolIndex] == 0) {
                continue;
            }

            foundSymbols[symbolIndex]++;

            if (foundSymbols[symbolIndex] <= symbolsToFind[symbolIndex]) {
                foundSymbolsCount++;
            }

            if (foundSymbolsCount == lettersWhichShouldBeFound.length()) {
                int beginSymbolIndex = (int) lowerCaseText.charAt(beginIndex);

                // move begin index to it's greatest possible value
                while (symbolsToFind[beginSymbolIndex] == 0
                        || foundSymbols[beginSymbolIndex] > symbolsToFind[beginSymbolIndex]) {

                    if (foundSymbols[beginSymbolIndex] > symbolsToFind[beginSymbolIndex]) {
                        foundSymbols[beginSymbolIndex]--;
                    }

                    beginIndex++;
                    beginSymbolIndex = (int) lowerCaseText.charAt(beginIndex);
                }

                int currentSubstringLength = currentIndex - beginIndex + 1;
                if (minSubstringLength > currentSubstringLength) {
                    minSubstringBegin = beginIndex;
                    minSubstringEnd = currentIndex;
                    minSubstringLength = currentSubstringLength;
                }
            }
        }

        if (foundSymbolsCount == lettersWhichShouldBeFound.length()) {
            return text.substring(0, minSubstringBegin) + "[" + text.substring(minSubstringBegin, minSubstringEnd + 1)
                    + "]" + text.substring(minSubstringEnd + 1);
        }

        return "No substring containing the wanted symbols!!!";
    }

    private static int[] getSymbolsToFindAsArray(String lettersWhichShouldBeFound) {
        int[] lettersToFind = new int[SYMBOLS_IN_ASCII__TABLE_COUNT];
        int currentSymbolAsciiValue = -1;

        for (int index = 0; index < lettersWhichShouldBeFound.length(); index++) {
            currentSymbolAsciiValue = (int) lettersWhichShouldBeFound.charAt(index);

            lettersToFind[currentSymbolAsciiValue]++;
        }

        return lettersToFind;
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        String text = input.nextLine();

        input.close();

        String result = findSmallestSubstringContainingTheEnglishAlphabet(text, ENGLISH_ALPHABET_LOWER_CASE);
        System.out.println(result);
    }
}