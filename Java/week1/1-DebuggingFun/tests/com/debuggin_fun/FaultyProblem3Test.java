package com.debuggin_fun;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.debugging_fun.FaultyProblem3;

public class FaultyProblem3Test {

    private FaultyProblem3 faultyProblem3;

    @Before
    public void setUp() {
        this.faultyProblem3 = new FaultyProblem3();
    }

    @Test
    public void test() {
        assertEquals("gnikrow", faultyProblem3.reverseEveryWordInString("working"));
        assertEquals("tahw dluoc", faultyProblem3.reverseEveryWordInString("what could"));
        assertEquals("si siht laer efil", faultyProblem3.reverseEveryWordInString("is this real life"));
    }

}
