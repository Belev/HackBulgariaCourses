package cars;

public class EntryPoint {
    public static void main(String[] args) {
        Car[] cars = new Car[] { new Audi("audi", 1500.6), new Bmw("bmw"), new Wolkswagen("wolkswagen") };

        for (Car car : cars) {
            System.out.println(car);
        }
    }
}
