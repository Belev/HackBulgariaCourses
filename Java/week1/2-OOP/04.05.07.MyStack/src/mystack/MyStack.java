package mystack;

public interface MyStack<T> {
    void push(T element);

    T pop();

    T peek();

    void clear();

    boolean isEmpty();

    int length();
}
