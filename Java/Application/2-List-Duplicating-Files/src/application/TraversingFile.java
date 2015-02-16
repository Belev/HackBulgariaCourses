package application;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class TraversingFile {
    private String name;
    private String fileFullPath;
    private byte[] content;

    public TraversingFile(String name, String fileFullPath) throws IOException {
        this.setName(name);
        this.setFileFullPath(fileFullPath);
        this.setContent(this.getFileContent());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFileFullPath() {
        return fileFullPath;
    }

    public void setFileFullPath(String fileFullPath) {
        this.fileFullPath = fileFullPath;
    }

    public byte[] getContent() {
        return this.content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    private byte[] getFileContent() throws IOException {
        Path filePath = Paths.get(this.getFileFullPath(), this.getName());

        return Files.readAllBytes(filePath);
    }

    @Override
    public int hashCode() {
        final int prime = 31;

        return prime + Arrays.hashCode(content);
    }

    @Override
    public boolean equals(Object other) {
        if (other == null) {
            return false;
        }

        if (!(other instanceof TraversingFile)) {
            return false;
        }

        TraversingFile otherFile = (TraversingFile) other;

        if (!Arrays.equals(content, otherFile.content)) {
            return false;
        }

        return true;
    }
    
    @Override
    public String toString() {
        return "\'" + this.getName() + "\'";
    }
}
