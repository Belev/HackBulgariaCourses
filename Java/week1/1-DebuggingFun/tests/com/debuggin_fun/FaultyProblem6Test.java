package com.debuggin_fun;

import static org.junit.Assert.*;

import org.junit.Test;

import com.debugging_fun.FaultyProblem6;

public class FaultyProblem6Test {

    @Test
    public void test() {
        assertEquals(1, FaultyProblem6.pow(1, 999999999));
        assertEquals(8, FaultyProblem6.pow(2, 3));
        assertEquals(16, FaultyProblem6.pow(2, 4));
        assertEquals(1, FaultyProblem6.pow(4, 0));
    }

}
