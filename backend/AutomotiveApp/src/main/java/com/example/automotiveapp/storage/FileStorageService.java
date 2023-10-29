package com.example.automotiveapp.storage;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class FileStorageService {
    private final String fileStorageLocation;
    private final String imageStorageLocation;

    public FileStorageService(@Value("${app.storage.location}") String storageLocation) throws FileNotFoundException {
        this.fileStorageLocation = storageLocation + "/files/";
        this.imageStorageLocation = storageLocation + "/img/";
        Path fileStoragePath = Path.of(this.fileStorageLocation);
        checkDirectoryExists(fileStoragePath);
        Path imageStoragePath = Path.of(this.imageStorageLocation);
        checkDirectoryExists(imageStoragePath);
    }

    private void checkDirectoryExists(Path path) throws FileNotFoundException {
        if (Files.notExists(path)) {
            throw new FileNotFoundException("Directory %s does not exist.".formatted(path.toString()));
        }
    }

    public List<String> saveImage(List<MultipartFile> files) {
        return saveFile(files, imageStorageLocation);
    }

    public List<String> saveFile(List<MultipartFile> files) {
        return saveFile(files, fileStorageLocation);
    }

    private List<String> saveFile(List<MultipartFile> files, String storageLocation) {
        List<Path> filepaths = createFilePath(files, storageLocation);
        List<String> paths = new ArrayList<>();
        int index = 0;
        for (MultipartFile file : files) {
            try {
                Files.copy(file.getInputStream(), filepaths.get(index), StandardCopyOption.REPLACE_EXISTING);
                paths.add(filepaths.get(index).getFileName().toString());
            } catch (IOException e) {
                throw new UncheckedIOException(e);
            }
            index++;
        }
        return paths;
    }

    private List<Path> createFilePath(List<MultipartFile> files, String storageLocation) {
        List<Path> filePaths = new ArrayList<>();
        for (MultipartFile file : files) {
            String originalFileName = file.getOriginalFilename();
            String fileExtension = FilenameUtils.getExtension(originalFileName);
            String uniqueFileName = generateUniqueFileName(fileExtension, originalFileName);
            Path filePath = Paths.get(storageLocation, uniqueFileName);
            filePaths.add(filePath);
        }
        return filePaths;
    }

    private String generateUniqueFileName(String fileExtension, String originalName) {
        String timestamp = String.valueOf(originalName + LocalDateTime.now()
                .truncatedTo(ChronoUnit.SECONDS)
                .toString()
                .replace(":", ""));
        return timestamp + "." + fileExtension;
    }

    public void deleteFile(String filePath) {
        try {
            Path fileToDelete = Paths.get("./uploads/img", filePath);
            if (Files.exists(fileToDelete)) {
                Files.delete(fileToDelete);
                log.info("File deleted: " + filePath);
            } else {
                log.warn("File not found: " + filePath);
            }
        } catch (IOException e) {
            log.error("Error deleting file: " + filePath, e);
            throw new UncheckedIOException(e);
        }
    }
}
