import static org.junit.Assert.*;

import org.junit.BeforeClass;
import org.junit.Test;

public class SmallestSubstringContainingTheAlphabetTest {
    private static final String ENGLISH_ALPHABET_LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";

    @Test
    public void withStringContainingTheAlphabetShouldReturnSmallestSubstring() {
        String text = "aaaaaabcdefghijklmnopqrstuvwxyz";
        String result = SmallestSubstringContainingTheAlphabet.findSmallestSubstringContainingTheEnglishAlphabet(text,
                ENGLISH_ALPHABET_LOWER_CASE);

        String expectedResult = "aaaaa[abcdefghijklmnopqrstuvwxyz]";

        assertEquals(expectedResult, result);
    }
    
    @Test
    public void withLowerAndUpperCaseContainingTheAlphabetShouldReturnSmallestSubstring() {
        String text = "abcDefGhijkLmn124345678!@#$%^&*opqrstuvwxyz!*aBCdefghijkLMN";
        String result = SmallestSubstringContainingTheAlphabet.findSmallestSubstringContainingTheEnglishAlphabet(text,
                ENGLISH_ALPHABET_LOWER_CASE);

        String expectedResult = "abcDefGhijkLmn124345678!@#$%^&*[opqrstuvwxyz!*aBCdefghijkLMN]";

        assertEquals(expectedResult, result);
    }

    @Test
    public void withStringNotContainingTheAlphabetShouldReturnMessage() {
        String text = "without all symbols";
        String result = SmallestSubstringContainingTheAlphabet.findSmallestSubstringContainingTheEnglishAlphabet(text,
                ENGLISH_ALPHABET_LOWER_CASE);
        
        String expectedResult = "No substring containing the wanted symbols!!!";

        assertEquals(expectedResult, result);
    }
}
