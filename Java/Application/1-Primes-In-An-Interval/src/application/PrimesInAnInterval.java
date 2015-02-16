package application;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Scanner;

public class PrimesInAnInterval {
	private static boolean[] getArePrimesArray(int to) {
		boolean[] primes = new boolean[to + 1];

		for (int i = 0; i < primes.length; i++) {
			primes[i] = true;
		}

		int toSqrt = (int) Math.floor(Math.sqrt(to));

		for (int index = 2; index <= toSqrt; index++) {
			if (primes[index] == true) {
				for (int j = index * index; j <= to; j += index) {
					primes[j] = false;
				}
			}
		}

		return primes;
	}

	public static Collection<Integer> findPrimesInAnInterval(int from, int to) {
		if (from < 0 || to < 0) {
			throw new IllegalArgumentException("from and to must be positive numbers.");
		}

		if (from > to) {
			throw new IllegalArgumentException("from can not be greater than to.");
		}

		Collection<Integer> primeNumbers = new ArrayList<Integer>();
		boolean[] primes = getArePrimesArray(to);

		for (int index = 0; index < primes.length; index++) {
			if (primes[index] == true && index >= from) {
				primeNumbers.add(index);
			}
		}

		return primeNumbers;

	}

	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);

		int from = input.nextInt();
		int to = input.nextInt();

		input.close();

		try {
			Collection<Integer> primes = findPrimesInAnInterval(from, to);
			System.out.println(primes.toString());
		} catch (IllegalArgumentException e) {
			System.out.println("invalid input");
		}
	}
}