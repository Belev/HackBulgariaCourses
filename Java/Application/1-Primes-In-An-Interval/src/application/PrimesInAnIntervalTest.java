package application;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.junit.Test;

import application.PrimesInAnInterval;

public class PrimesInAnIntervalTest {

	@Test
	public void withValidFromAndToShouldReturnCollectionOfPrimes() {
		Collection<Integer> expected = Arrays.asList(1, 2, 3, 5);
		Collection<Integer> actual = PrimesInAnInterval.findPrimesInAnInterval(1, 6);

		assertEquals(expected, actual);
	}

	@Test
	public void withRangeWithoutPrimesInItShouldReturnEmptyCollection() {
		Collection<Integer> expected = new ArrayList<Integer>();
		Collection<Integer> actual = PrimesInAnInterval.findPrimesInAnInterval(15, 16);

		assertEquals(expected, actual);
	}

	@Test(expected = IllegalArgumentException.class)
	public void withNegativeFromShouldCauseIllegalArgumentException() {
		PrimesInAnInterval.findPrimesInAnInterval(-20, 10);
	}

	@Test(expected = IllegalArgumentException.class)
	public void withNegativeToShouldCauseIllegalArgumentException() {
		PrimesInAnInterval.findPrimesInAnInterval(5, -5);
	}

	@Test(expected = IllegalArgumentException.class)
	public void withGreaterFromThanToShouldCauseIllegalArgumentException() {
		PrimesInAnInterval.findPrimesInAnInterval(20, 10);
	}
}
