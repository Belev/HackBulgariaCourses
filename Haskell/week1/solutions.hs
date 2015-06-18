-- 01. Even
even' :: Int -> Bool
even' x = if mod x 2 == 0 then False else True

-- 02. Odd
odd' :: Int -> Bool
odd' x = not (even' x)

-- 03. Calculate BMI
bmi :: Double -> Double -> Double
bmi height weight = weight / (height * height)

-- 04. Convert degrees to radians
deg2rad :: Double -> Double
deg2rad d = d * (pi / 180)

-- 05. Convert radians to degrees
rad2deg :: Double -> Double
rad2deg r = r * (180 / pi)

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
head' :: [Int] -> Int
head' (x:_) = x
head' _ = error "Can not get head from empty list"

-- 14. Tail
tail' :: [Int] -> [Int]
tail' (_:xs) = xs

-- 16. Last
last' :: [Int] -> Int
last' (x:xs) = last' xs
last' [x] = x

-- 17. Double all elements
double :: [Int] -> [Int]
double (x:xs) = (2 * x) : (double xs)
double [] = []
double [x] = [2 * x]

-- 18. More generic - make it possible to multiply all elements in a list with a given number
mult :: Int -> [Int] -> [Int]
mult multiplier (x:xs) = (multiplier * x) : (mult multiplier xs)
mult multiplier [] = []
mult multiplier [x] = [multiplier * x]

-- 19. Get the n-th element of a list
nth :: Int -> [Int] -> Int
nth index (x:xs) = nth (index - 1) xs
nth 0 (x:_) = x
nth index [] = error "Can not get unexisting element"

nthBuiltIn :: Int -> [Int] -> Int
nthBuiltIn index xs = xs!!index

-- 20. Is an element member of a list?
member :: Int -> [Int] -> Bool
member number (x:xs) = if number == x then True else member number xs
member number _ = False

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
sum' (x:xs) = x + sum xs
sum' [x] = x

-- 23. Get the product of a list
product' :: [Int] -> Int
product' (x:xs) = x * product' xs
product' [x] = x

-- 24. Multiply lists
multLists :: [Int] -> [Int] -> [Int]
multLists (x:xs) (y:ys) = (x * y) : multLists xs ys
multLists (x:_) [y] = x * y : []
multLists [x] (y:_) = x * y : []
multLists [] (y:_) = []
multLists (x:_) [] = []
multLists [] [] = []

-- 25. Number to string
number2string :: Int -> String
number2string number = show number

-- 26. String to number
string2number :: String -> Int
string2number numberStr = read numberStr :: Int

