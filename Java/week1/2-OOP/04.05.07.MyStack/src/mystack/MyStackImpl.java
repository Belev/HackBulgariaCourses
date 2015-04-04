package mystack;

public class MyStackImpl<T> implements MyStack<T> {
    private class Element {
        public T value;
        public Element next;

        public Element(T value, Element next) {
            this.value = value;
            this.next = next;
        }
    }

    private Element top;
    private int length;

    @Override
    public void push(T element) {
        this.length++;

        Element currentTop = this.top;
        Element newTop = new Element(element, currentTop);
        this.top = newTop;
    }

    @Override
    public T pop() {
        if (this.top != null) {
            this.length--;

            T value = this.top.value;
            this.top = this.top.next;

            return value;
        }

        return null;
    }

    @Override
    public T peek() {
        return this.top != null ? this.top.value : null;
    }

    @Override
    public void clear() {
        while (!this.isEmpty()) {
            this.pop();
        }
    }

    @Override
    public boolean isEmpty() {
        return this.length == 0;
    }

    @Override
    public int length() {
        return this.length;
    }

}
