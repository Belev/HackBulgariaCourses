package com.debugging_fun;

public class FaultyProblem1 {
	public long getLargestPalindrome(long N) {
		if (Utils.isPalindrome(N - 1)) {
			return N - 1;
		} else {
			return getLargestPalindrome(N - 1);
		}
	}
}