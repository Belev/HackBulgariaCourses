package pair;

public final class Pair {
    private Object first;
    private Object second;

    public Pair(Object first, Object second) {
        this.setFirst(first);
        this.setSecond(second);
    }

    public Object getFirst() {
        return first;
    }

    public void setFirst(Object first) {
        this.first = first;
    }

    public Object getSecond() {
        return second;
    }

    public void setSecond(Object second) {
        this.second = second;
    }

    @Override
    public String toString() {
        return "(" + this.first.toString() + ", " + this.second.toString() + ")";
    }

    @Override
    public boolean equals(Object arg) {
        Pair other = (Pair) arg;

        return (other != null) && (this.first.equals(other.first) && (this.second.equals(other.second)));
    }
}
