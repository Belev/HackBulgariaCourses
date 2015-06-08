import static org.junit.Assert.assertEquals;

import org.junit.Test;


public class HelpHassTest {

	@Test
	public void testInput1() {
		String[] input = new String[] { "H F", "F L", "H L" };
		String expected = "H L";
		
		String actual = HelpHass.findBestRoute(input);
		
		assertEquals(expected, actual);
	}
	
	@Test
	public void testInput2() {
		String[] input = new String[] { "H A", "K L", "S K", "A S" };
		String expected = "H A S K L";
		
		String actual = HelpHass.findBestRoute(input);
		
		assertEquals(expected, actual);
	}
}
