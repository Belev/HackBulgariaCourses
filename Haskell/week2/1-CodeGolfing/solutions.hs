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
localMaxima ::Ord a => [a] -> [a]
localMaxima (_:_:[]) = []
localMaxima (x:y:z:zs)
            | x < y && y > z = y : localMaxima (y:z:zs)
            | otherwise = localMaxima (y:z:zs)

-- 08. Map a function to a list of lists
mapMap :: (a -> b) -> [[a]] -> [[b]]
mapMap f = map $ map (\x -> f x)

-- 09. Filter a list of lists
filterFilter :: (a -> Bool) -> [[a]] -> [[a]]
filterFilter f = map $ filter f

-- 10. Generate the unit matrix by given element and dimensions
unit :: Int -> Int -> [[Int]]
unit elem dim = map row [0..dim-1]
	where row pos = (take pos $ repeat 0) ++ [elem] ++ (take (dim-pos-1) $ repeat 0)

-- 11. Get the nth row and column of a matrix
row :: Int -> [[a]] -> [a]
row n matrix = matrix !! n

-- 12. Transpose a matrix
transpose' :: [[a]]->[[a]]
transpose' ([]:_) = []
transpose' x = (map head x) : transpose' (map tail x)

-- 13. Sum of matrices
sumMatrices :: Num a => [[a]] -> [[a]] -> [[a]]
sumMatrices (x:xs) (y:ys) = zipWith (+) x y : sumMatrices xs ys
sumMatrices _ _ = []
