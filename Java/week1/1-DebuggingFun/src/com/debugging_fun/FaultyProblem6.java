package com.debugging_fun;

public class FaultyProblem6 {
	public static long pow(int a, int b) {
		if (b == 0) {
			return 1;
		}

		long temp = pow(a, b / 2);

		if (b % 2 == 1) {
			if (b > 0) {
				return a * temp * temp;
			} else {
				return (temp * temp) / a;
			}
		} else {
			return temp * temp;
		}
	}
}
