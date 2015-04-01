package calculator;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Stack;

import javafx.util.Pair;

public class CalculatorImpl implements Calculator {
    private static final String NUMBER_TYPE = "number";
    private static final String FUNCTION_TYPE = "function";
    private static final String SEPARATOR_TYPE = "separator";
    private static final Map<String, Integer> priorities;

    static {
        priorities = new HashMap<String, Integer>();

        priorities.put(")", 5);
        priorities.put("sqrt", 4);
        priorities.put("pow", 4);
        priorities.put("ln", 4);
        priorities.put("!", 4);
        priorities.put("^", 3);
        priorities.put("*", 3);
        priorities.put("/", 3);
        priorities.put("+", 2);
        priorities.put("-", 2);
        priorities.put("(", 0);
    }

    public double calculateExpression(String expression) {
        List<Pair<String, String>> tokens = this.tokenize(expression);
        List<String> postfix = this.convertToPostfix(tokens);

        return this.calculatePostfix(postfix);
    }

    private List<Pair<String, String>> tokenize(String expression) {
        List<Pair<String, String>> tokens = new ArrayList<Pair<String, String>>();

        char[] exp = expression.toCharArray();

        for (int index = 0; index < exp.length; index++) {
            String value = "";
            String type = "";

            if (exp[index] == ' ') {
                continue;
            }

            boolean isCurrentSymbolDigit = Character.isDigit(exp[index]);
            boolean hasMinus = (exp[index] == '-') && Character.isDigit(exp[index + 1]);

            if (isCurrentSymbolDigit || hasMinus) {

                type = NUMBER_TYPE;

                for (; index < exp.length
                        && (Character.isDigit(exp[index]) || expression.charAt(index) == '.' || expression
                                .charAt(index) == '-'); index++) {

                    value += exp[index];
                }

                index--;
            } else if (Character.isLetter(exp[index])) {
                type = FUNCTION_TYPE;

                for (; index < exp.length && Character.isLetter(exp[index]); index++) {
                    value += exp[index];
                }

                index--;
            } else if (exp[index] == ',') {
                type = SEPARATOR_TYPE;

                value += exp[index];
            } else {
                value += exp[index];
            }

            tokens.add(new Pair<String, String>(value, type));
        }

        return tokens;
    }

    private List<String> convertToPostfix(List<Pair<String, String>> tokens) {
        List<String> postfix = new ArrayList<String>();
        Stack<String> operators = new Stack<String>();

        for (Pair<String, String> token : tokens) {
            String value = token.getKey();
            String type = token.getValue();

            if (type.equals(NUMBER_TYPE)) {
                postfix.add(value);
            } else if (type.equals(FUNCTION_TYPE)) {
                operators.push(value);
            } else if (type.equals(SEPARATOR_TYPE)) {
                while (operators.peek().equals("(") == false) {
                    postfix.add(operators.pop());
                }
            } else if (value.equals("(")) {
                operators.push(value);
            } else if (value.equals(")")) {
                while ((value = operators.pop()).equals("(") == false) {
                    postfix.add(value);
                }
            } else {
                while (operators.size() != 0 && priorities.get(value) <= priorities.get(operators.peek())) {

                    postfix.add(operators.pop());
                }

                operators.push(value);
            }
        }

        while (operators.size() != 0) {
            postfix.add(operators.pop());
        }

        return postfix;
    }

    private double calculatePostfix(List<String> postfix) {
        Stack<Double> result = new Stack<Double>();

        for (String token : postfix) {
            if (token.equals("+")) {
                result.push(result.pop() + result.pop());
            } else if (token.equals("-")) {
                result.push(-result.pop() + result.pop());
            } else if (token.equals("*")) {
                result.push(result.pop() * result.pop());

            } else if (token.equals("/")) {
                result.push(1 / result.pop() * result.pop());
            } else if (token.equals("ln")) {
                result.push(Math.log(result.pop()));
            } else if (token.equals("sqrt")) {
                result.push(Math.sqrt(result.pop()));
            } else if (token.equals("pow") || token.equals("^")) {
                double second = result.pop();
                double first = result.pop();
                result.push(Math.pow(first, second));
            } else if (token.equals("!")) {
                result.push(this.getFactorial(result.pop()));
            } else {
                result.push(Double.parseDouble(token));
            }
        }

        return result.pop();
    }

    private double getFactorial(double number) {
        double factorial = 1;

        for (int i = 2; i <= number; i++) {
            factorial *= i;
        }

        return factorial;
    }
}
