-- 01. Even
even' :: Int -> Bool
even' number = mod number 2 == 0

-- 02. Odd
odd' :: Int -> Bool
odd' number = not (even' number)

-- 03. Calculate BMI
bmi :: Double -> Double -> Double
bmi height weight = weight / height^2

-- 04. Convert degrees to radians
deg2rad :: Double -> Double
deg2rad degrees = degrees * (pi / 180)

-- 05. Convert radians to degrees
rad2deg :: Double -> Double
rad2deg radians = radians * (180 / pi)

-- 06. Does it form a triangle?
isTriangle :: Int -> Int -> Int -> Bool
isTriangle a b c = (a + b) > c && (b + c) > a && (a + c) > b

-- 07. Perimeter of a triangle
perimeter :: Double -> Double -> Double -> Double
perimeter a b c = a + b + c

-- 08. Area of triangle
area :: Double -> Double -> Double -> Double
area a b c = sqrt (p * (p - a) * (p - b) * (p - c))
                    where p = perimeter a b c / 2

-- 09. Calculate
calculate :: Char -> Double -> Double -> Double
calculate operator a b = case operator of
                                    '+' -> a + b
                                    '-' -> a - b
                                    '*' -> a * b
                                    '/' -> a / b
                                    _ -> error "Not supported operator!"

-- 10. Currency Converter (working with dollars, levs and euros)
convert :: String -> String -> Double -> Double
convert "usd" "eur" money = money * 0.89
convert "usd" "bgn" money = money * 1.74
convert "bgn" "usd" money = money / 1.74
convert "bgn" "eur" money = money / 1.95
convert "eur" "usd" money = money / 0.89
convert "eur" "bgn" money = money * 1.95
convert _ _ money = error "Invalid currency"

-- 13. Head
head' :: [a] -> a
head' (x:_) = x
head' _ = error "Can not get head from empty list"

-- 14. Tail
tail' :: [a] -> [a]
tail' (_:xs) = xs
tail' _ = error "Can not get tail from empty list"

-- 16. Last
last' :: [a] -> a
last' [x] = x
last' (x:xs) = last' xs
last' [] = error "Can not get element of empty list."

-- 17. Double all elements
double :: [Int] -> [Int]
double (x:xs) = (2 * x) : (double xs)
double [] = []

-- 18. More generic - make it possible to multiply all elements in a list with a given number
mult :: Int -> [Int] -> [Int]
mult multiplier (x:xs) = (multiplier * x) : (mult multiplier xs)
mult multiplier [] = []

-- 19. Get the n-th element of a list
nth :: Int -> [a] -> a
nth 0 (x:_) = x
nth index (x:xs) = nth (index - 1) xs
nth index [] = error "Can not get unexisting element"

nthBuiltIn :: Int -> [a] -> a
nthBuiltIn index xs = xs!!index

-- 20. Is an element member of a list?
member :: Int -> [Int] -> Bool
member number (x:xs) = if number == x then True else member number xs
member _  _ = False

memberBuiltIn :: Int -> [Int] -> Bool
memberBuiltIn number xs = elem number xs

-- 21. Is the list a fibonacci sequence?
fib :: Int -> Int
fib n = fibs (0,1) !! n
    where fibs (a,b) = a : fibs (b,a+b)

isFibSeq :: Int -> [Int] -> Bool
isFibSeq position (x:xs) = if x /= fib position then False else isFibSeq (position + 1) xs
isFibSeq position [] = True

isFibonacciSequence :: [Int] -> Bool
isFibonacciSequence seq = isFibSeq 0 seq

-- 22. Get the sum of a list
sum' :: [Int] -> Int
sum' (x:xs) = x + sum' xs
sum' [] = 0

-- 23. Get the product of a list
product' :: [Int] -> Int
product' (x:xs) = x * product' xs
product' [] = 1

-- 24. Multiply lists
multLists :: [Int] -> [Int] -> [Int]
multLists (x:xs) (y:ys) = (x * y) : multLists xs ys
multLists _ _ = []

-- 25. Number to string
number2string :: Int -> String
number2string number = show number

-- 26. String to number
string2number :: String -> Int
string2number numberStr = read numberStr :: Int

-- 27. Is valid ID?
-- 28. Get the zodiac sign from an ID

-- 30. Concatenate the lists
concatenate :: [[a]] -> [a]
concatenate [] = []
concatenate (x:xs) = x ++ concatenate xs

-- 31. Take all elements of a list without the last one
init' :: [a] -> [a]
init' [] = error "You can't do that with the empty list!"
init' xs = reverse (tail (reverse xs))

-- 32. Take the first n elements from a list
take' :: Int -> [a] -> [a]
take' 0 _ = []
take' _ [] = []
take' count (x:xs) = x : take' (count - 1) xs

-- 33. Drop the first n elements from a list
drop' :: Int -> [a] -> [a]
drop' 0 (xs) = xs
drop' _ [] = []
drop' count (x:xs) = drop' (count - 1) xs

-- 34. Zipping lists
zip' :: [a] -> [b] -> [(a,b)]
zip' [] _ = []
zip' _ [] = []
zip' (x:xs) (y:ys) = (x,y) : zip' xs ys

-- 35. Now unzip it!
unzip' :: [(a,b)] -> ([a], [b])
unzip' [] = ([], [])
unzip' ((a,b):xs) = (a : fst unzip'', b : snd unzip'')
       where unzip'' = unzip' xs

-- 36. Grouping - still not working
group' :: Eq a => [a] -> [[a]]
group' (x:xs) = (x:equals):group' remainder
  where (equals, remainder) = span (== x) xs
group' [] = []

-- 37. Generate all pythagorean triples
pyths from to = [(a,b,c) | a <- [from..to], b <- [from..to], c <- [from..to], a^2 + b^2 == c^2, a < b, b < c]

-- 38. Return a function, which multiplies a number by a factor
multiplyBy :: (Num n) => n -> n -> n
multiplyBy n = \x -> n * x

-- 39. Get the last digit of all numbers in a list
lastDigits :: [Int] -> [Int]
lastDigits (x:xs) = (mod x 10) : lastDigits xs
lastDigits [] = []

-- 40. Turn all strings in a list to integers
stringsToIntegers :: [String] -> [Int]
stringsToIntegers (x:xs) = read x : stringsToIntegers xs
stringsToIntegers [] = []

-- 41. Get the fibonacci numbers with the corresponding indices
fibonaccis :: [Int] -> [Int]
fibonaccis (x:xs) = fib x : fibonaccis xs
fibonaccis [] = []

-- 42. Take a function and apply it to all elements of a list
applyToAll :: (Int -> Int) -> [Int] -> [Int]
applyToAll f = \xs -> case xs of
               [] -> []
               (x:xs) -> f x : applyToAll f xs

-- 44. Get all odd numbers in a list
odds :: [Int] -> [Int]
odds (x:xs) = if odd' x
              then x : odds xs
              else odds xs
odds [] = []

-- 45. More generic - return a function that filters all the numbers in a list divisible by 'n'
divisibles :: Int -> [Int] -> [Int]
divisibles 0 = error "Can not divide by 0."
divisibles n = \xs -> case xs of
               [] -> []
               (x:xs) -> if mod x n == 0
                         then x : divisibles n xs
                         else divisibles n xs

-- 46. Take a predicate and filter a list
<<<<<<< HEAD
filterBy :: (a -> Bool) -> [a] -> [a]
filterBy pred (x:xs) | pred x = x : filterBy pred xs
                     | otherwise = filterBy pred xs
filterBy _ [] = []
                
-- 48. Concatenate the lists
concat' :: [[a]] -> [a]
concat' (x:xs) = x ++ concat' xs
concat' [] = []

-- 49. Reducing
reducel :: (a -> b -> a) -> a -> [b] -> a
reducel f value (x:xs) = reducel f (f value x) xs
reducel _ value [] = value

-- 50. Reduce in the other direction

map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' f (x:xs) = f x : map f xs
=======
filterBy :: (Int -> Bool) -> [Int] -> [Int]
filterBy pred = \xs -> case xs of
                [] -> []
                (x:xs) -> if pred x
                          then x : filterBy pred xs
                          else filterBy pred xs
>>>>>>> 741f5334cde3b28fdf9ea3ca56bfe2fdcd5f4694
