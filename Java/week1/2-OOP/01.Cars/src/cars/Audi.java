package cars;

public class Audi extends Car {
    private double mileage;

    public Audi(String model, double mileage) {
        super(model);
        this.setMileage(mileage);
    }

    public double getMileage() {
        return mileage;
    }

    public void setMileage(double mileage) {
        this.mileage = mileage;
    }

    @Override
    public String toString() {
        return super.toString() + " - " + this.getMileage() + " miles.";
    }
}
