package cars;

public abstract class Car {
    private String model;

    public Car(String model) {
        this.setModel(model);
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Override
    public String toString() {
        return "I am - " + this.getModel();
    }
}
