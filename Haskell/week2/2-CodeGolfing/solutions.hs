-- 01. Map as foldl
mapFoldl :: (a -> b) -> [a] -> [b]
mapFoldl f l = reverse (foldl (\ys y -> (f y) : ys) [] l)

-- 02. Filter as foldl
filterFoldl :: (a -> Bool) -> [a] -> [a]
filterFoldl pred l = reverse (foldl (\ys y -> if pred y
                                              then y : ys
                                              else ys) [] l)

-- 03. Quicksort!
quicksort :: Ord a => [a] -> [a]
quicksort (x:xs) = quicksort smaller ++ [x] ++ quicksort larger
          where smaller = [y | y <- xs, y <= x]
                larger = [y | y <- xs, y > x]
quicksort [] = []

-- 04. Repeat
repeat' :: a -> [a]
repeat' elem = elem : repeat elem

-- 05. Cycling!
cycle' :: [a] -> [a]
cycle' [] = []
cycle' l = l ++ cycle' l

-- 06. Take every nth element from a list
everyNth :: Int -> [a] -> [a]
everyNth position l = map snd $ filter (\(x, y) -> mod x position == 0) $ zip [1..] l

-- 07. Get the local maximas in a list of Integers
localMaxima :: [Int] -> [Int]
localMaxima [] = []
localMaxima (x:[]) = []
localMaxima (x:y:[]) = []
localMaxima (x:y:z:zs)
            | x < y && y > z = y : localMaxima (y:z:zs)
            | otherwise = localMaxima (y:z:zs)
