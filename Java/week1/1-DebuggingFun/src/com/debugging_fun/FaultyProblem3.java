package com.debugging_fun;

public class FaultyProblem3 {
    
    public String reverseEveryWordInString(String sentence){
        String[] words = sentence.split(" ");
        for (String word: words){
            sentence = sentence.replaceFirst(word, reverse(word));
        }
        return sentence;
    }

    private String reverse(String word) {
        return Utils.reverseMe(word);
    }
}
