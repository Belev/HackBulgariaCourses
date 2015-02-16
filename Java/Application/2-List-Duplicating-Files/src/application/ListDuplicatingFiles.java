package application;

import java.io.File;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class ListDuplicatingFiles {
    private static Set<TraversingFile> notDuplicatedFiles;

    private static void findNotDuplicatedFilesInDirectory(String startDirectory) throws IOException {
        notDuplicatedFiles = new HashSet<TraversingFile>();

        traverseDirectory(new File(startDirectory), startDirectory, false);
    }

    private static void traverseDirectory(File directory, String path, boolean hasIteratedOnce) throws IOException {
        if (directory.isDirectory()) {
            String[] directoryChildren = directory.list();

            for (String child : directoryChildren) {
                if (hasIteratedOnce) {
                    traverseDirectory(new File(directory, child), path + "/" + directory.getName(), true);
                } else {
                    traverseDirectory(new File(directory, child), path, true);
                }
            }
        } else {
            notDuplicatedFiles.add(new TraversingFile(directory.getName(), path));
        }
    }

    public static void main(String[] args) throws IOException {
        String startDirectory = "./";

        findNotDuplicatedFilesInDirectory(startDirectory);
        
        System.out.println(notDuplicatedFiles);
    }
}