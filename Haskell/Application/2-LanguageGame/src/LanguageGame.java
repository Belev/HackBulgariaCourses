import java.util.Scanner;


public class LanguageGame {
	private static final String YES = "yes";
	private static final String NO = "no";
	
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);

		String language = scanner.nextLine();
		String word = scanner.nextLine();
		
		System.out.println(isFromLanguage(language, word));
	}
	
	public static String isFromLanguage(String language, String word) {
		int differentSymbolsCount = language.length() / 3;
		
		int differentSymbolsInWordCount = 1;
		int symbolOccurences = 0;
		int lastSymbolOccurences = 0;
		Character lastEqualSymbol = word.charAt(0);
		
		for (Character symbol : word.toCharArray()) {
			if (lastEqualSymbol.equals(symbol)) {
				symbolOccurences++;
			} else {
				if (lastSymbolOccurences == 0) {
					lastSymbolOccurences = symbolOccurences;
				} else if (lastSymbolOccurences != symbolOccurences) {
					return NO;
				}
				
				symbolOccurences = 1;
				lastEqualSymbol = symbol;
				differentSymbolsInWordCount++;
			}
		}
		
		if (lastSymbolOccurences != symbolOccurences) {
			return NO;
		}
		
		return (differentSymbolsInWordCount == differentSymbolsCount) ? YES : NO;
	}
}
