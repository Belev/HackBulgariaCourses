import static org.junit.Assert.*;

import org.junit.Test;


public class NameMatchingTest {

	@Test
	public void testInput1() {
		String[] knownMaleFemaleNames = "1 1".split(" ");
		String[] names = "Vetta Tess Lejetta".split(" ");
		String expected = "100.0%";
		
		String actual = NameMatching.finderGuessChanceFormated(knownMaleFemaleNames, names);
		
		assertEquals(expected, actual);
	}
	
	@Test
	public void testInput2() {
		String[] knownMaleFemaleNames = "1 0".split(" ");
		String[] names = "Jass Julietta Frass Qetta".split(" ");
		String expected = "50.0%";
		
		String actual = NameMatching.finderGuessChanceFormated(knownMaleFemaleNames, names);
		
		assertEquals(expected, actual);
	}
}
