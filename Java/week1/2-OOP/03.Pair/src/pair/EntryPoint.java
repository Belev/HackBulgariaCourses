package pair;

public class EntryPoint {

    public static void main(String[] args) {
        Pair p1 = new Pair(6, "pesho");
        Pair p2 = new Pair(6, "pesho");

        System.out.println(p1.equals(p2));
        System.out.println(p2);
    }

}
