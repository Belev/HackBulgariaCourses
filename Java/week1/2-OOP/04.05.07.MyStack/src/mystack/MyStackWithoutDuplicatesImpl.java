package mystack;

public class MyStackWithoutDuplicatesImpl<T> extends MyStackImpl<T> implements MyStack<T> {
    public MyStackWithoutDuplicatesImpl() {
        super();
    }

    public MyStackWithoutDuplicatesImpl(Element element) {
        super(element);
    }

    @Override
    public void push(T element) {
        if (!this.isContained(element)) {
            super.push(element);
        }
    };

    private boolean isContained(T element) {
        Element current = this.getTop();
        boolean isContained = false;

        while (current != null) {
            if (element.equals(current.value)) {
                isContained = true;
                break;
            }

            current = current.next;
        }

        return isContained;
    }
}
