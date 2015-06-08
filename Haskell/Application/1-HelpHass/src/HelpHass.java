import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

public class HelpHass {
	private final static String START = "H";
	private final static String END = "L";

	private static int shortestRouteSteps;
	private static Stack<String> shortestRoute;
	private static Map<String, Boolean> used;
	private static Map<String, List<String>> routes;

	public static void main(String[] args) {
	}

	public static String findBestRoute(String[] testInput) {
		shortestRouteSteps = Integer.MAX_VALUE;
		shortestRoute = new Stack<String>();

		parseInput(testInput);

		findShortestRoute(new Stack<String>(), START);
		return String.join(" ", shortestRoute);
	}

	private static void parseInput(String[] input) {
		used = new HashMap<String, Boolean>();
		routes = new HashMap<String, List<String>>();

		for (String route : input) {
			String[] splitted = route.split(" ");

			if (routes.get(splitted[0]) == null) {
				routes.put(splitted[0], new ArrayList<String>());
			}

			routes.get(splitted[0]).add(splitted[1]);
			used.put(splitted[0], false);
			used.put(splitted[1], false);
		}
	}

	@SuppressWarnings("unchecked")
	private static void findShortestRoute(Stack<String> currentRoute, String station) {

		used.put(station, true);
		currentRoute.push(station);

		if (station.equals(END) && currentRoute.size() < shortestRouteSteps) {
			shortestRouteSteps = currentRoute.size();
			shortestRoute = (Stack<String>) currentRoute.clone();
		} else {
			for (String neighbour : routes.get(station)) {
				if (!used.get(neighbour)) {
					findShortestRoute(currentRoute, neighbour);
				}
			}
		}

		used.put(station, false);
		currentRoute.pop();
	}
}
