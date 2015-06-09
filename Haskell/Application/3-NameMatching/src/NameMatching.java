import java.util.Scanner;

public class NameMatching {
	private static final String FEMALE_SUFIX = "tta";
	
	private static int maleNamesCount = 0;
	private static int femaleNamesCount = 0;
	
	@SuppressWarnings("resource")
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		String[] knownMaleFemaleNames = scanner.nextLine().split(" ");
		String[] names = scanner.nextLine().split(" ");
		
		System.out.println(finderGuessChanceFormated(knownMaleFemaleNames, names));
	}
	
	public static String finderGuessChanceFormated(String[] knownMaleFemaleNames, String[] names) {
		return findGuessChance(knownMaleFemaleNames, names) + "%";
	}
	
	private static double findGuessChance(String[] knownMaleFemaleNames, String[] names) {
		int knownMaleNamesCount = Integer.parseInt(knownMaleFemaleNames[0]);
		int knownFemaleNamesCount = Integer.parseInt(knownMaleFemaleNames[1]);
		countMaleAndFemaleNames(names);
		
		double maleGuessChance = 100.0;
		double femaleGuessChance = 100.0;
		
		int maleDifference = Math.abs(knownMaleNamesCount - maleNamesCount);
		if (maleDifference > 1) {
			maleGuessChance = (1.0 / calculateFactorial((maleDifference))) * 100;
					
		}
		
		int femaleDifference = Math.abs(knownFemaleNamesCount - femaleNamesCount);
		if (femaleDifference > 1) {
			femaleGuessChance = (1.0 / calculateFactorial((femaleDifference))) * 100;
					
		}
		
		if (maleGuessChance != 100.0 && femaleGuessChance != 100.0) {
			return (maleGuessChance + femaleGuessChance) / 2.0;
		}
		
		return maleGuessChance != 100.0 ? maleGuessChance : femaleGuessChance;
	}
	
	private static Boolean isFemale(String name) {
		return name.substring(name.length() - FEMALE_SUFIX.length()).equals(FEMALE_SUFIX);
	}
	
	private static void countMaleAndFemaleNames(String[] names) {
		maleNamesCount = 0;
		femaleNamesCount = 0;
		
		for (String name : names) {
			if (!isFemale(name)) {
				maleNamesCount++;
			} else {
				femaleNamesCount++;
			}
		}
	}
	
	private static Long calculateFactorial(int toNumber) {
		Long result = 1L;
		
		while(toNumber > 0) {
			result *= toNumber;
			toNumber--;
		}
		
		return result;
	}
}
