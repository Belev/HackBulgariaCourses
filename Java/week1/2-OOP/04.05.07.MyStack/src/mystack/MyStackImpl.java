package mystack;

public class MyStackImpl<T> implements MyStack<T> {
    protected class Element {
        public T value;
        public Element next;

        public Element(T value, Element next) {
            this.value = value;
            this.next = next;
        }
    }

    private Element top;
    private int length;

    public MyStackImpl() {
        this(null);
    }

    public MyStackImpl(Element top) {
        this.setTop(top);
        this.setLength(0);
    }

    public Element getTop() {
        return top;
    }

    public void setTop(Element top) {
        this.top = top;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    @Override
    public void push(T element) {
        this.setLength(this.getLength() + 1);

        Element currentTop = this.getTop();
        Element newTop = new Element(element, currentTop);
        this.setTop(newTop);
    }

    @Override
    public T pop() {
        if (this.getTop() != null) {
            this.setLength(this.getLength() - 1);

            T value = this.getTop().value;
            this.setTop(this.getTop().next);

            return value;
        }

        return null;
    }

    @Override
    public T peek() {
        return this.getTop() != null ? this.getTop().value : null;
    }

    @Override
    public void clear() {
        while (!this.isEmpty()) {
            this.pop();
        }
    }

    @Override
    public boolean isEmpty() {
        return this.getLength() == 0;
    }

    @Override
    public int length() {
        return this.getLength();
    }
}
