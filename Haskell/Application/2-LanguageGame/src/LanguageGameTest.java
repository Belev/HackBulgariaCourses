import static org.junit.Assert.*;

import org.junit.Test;


public class LanguageGameTest {

	@Test
	public void testInput1() {
		String language = "a^nb^n";
		String word = "1122";
		String expected = "yes";
		String actual = LanguageGame.isFromLanguage(language, word);
		
		assertEquals(expected, actual);
	}

	@Test
	public void testInput2() {
		String language = "a^nb^n";
		String word = "aabb";
		String expected = "yes";
		String actual = LanguageGame.isFromLanguage(language, word);
		
		assertEquals(expected, actual);
	}
	
	@Test
	public void testInput3() {
		String language = "a^nb^nc^n";
		String word = "abb";
		String expected = "yes";
		String actual = LanguageGame.isFromLanguage(language, word);
		
		assertEquals(expected, actual);
	}
	
	@Test
	public void testInput4() {
		String language = "a^nb^nc^n";
		String word = "aabbc";
		String expected = "yes";
		String actual = LanguageGame.isFromLanguage(language, word);
		
		assertEquals(expected, actual);
	}
	
	@Test
	public void testInput5() {
		String language = "a^nb^nc^n";
		String word = "aabbcc";
		String expected = "yes";
		String actual = LanguageGame.isFromLanguage(language, word);
		
		assertEquals(expected, actual);
	}
}
