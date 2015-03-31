package calculator;

import java.util.Scanner;

public class EntryPoint {

	public static void main(String[] args) {
		Calculator calculator = new CalculatorImpl();

		Scanner input = new Scanner(System.in);
		while (true) {
			System.out.println("Enter expression:");
			String expression = input.nextLine();

			System.out.println("Output: " + calculator.calculateExpression(expression));
		}
	}
}