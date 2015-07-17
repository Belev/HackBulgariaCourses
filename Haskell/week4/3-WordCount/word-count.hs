import System.Environment

main = do
  (mode:fileName:_) <- getArgs
  content <- readFile fileName
  print $ count mode content

type Mode = String
type Content = String

count :: Mode -> Content -> Int
count mode
    | mode == "-l" = length . lines
    | mode == "-w" = length . words
    | mode == "-c" = sum . map length . words 
