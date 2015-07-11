class Dionom d where
      dempty :: d
      dappend :: d -> d -> d
      dconcat :: [d] -> d
      dconcat = foldr dappend dempty

newtype Sums a = Sums { getSum :: a }
        deriving (Show)

newtype Products a = Products { getProduct :: a }
        deriving (Show)

instance Dionom [a] where
         dempty [] = []
         dappend = (++)

instance Num a => Dionom (Sums a) where
         dempty = Sums 0
         dappend = (Sums x) (Sums y) = Sums (x + y)

instance Num a => Dionom (Products a) where
         dempty = Products 0
         dappend = (Products x) (Products y) = Products (x * y)
