package time;

public class EntryPoint {

    public static void main(String[] args) {
        TimeImpl time = new TimeImpl(1993, 12, 5, 10, 10, 10);

        System.out.println(time);
        System.out.println(time.now());
    }

}
