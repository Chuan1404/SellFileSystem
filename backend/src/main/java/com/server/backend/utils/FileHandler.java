package com.server.backend.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;

public abstract class FileHandler {
    protected int low;
    protected int medium;
    protected int high;
    protected int minimumPixels;
    public abstract ResponseEntity<?> checkFile(File file);
    public abstract File resizedFile(File file, double targetWidth);

    public abstract File addCopyRight(File file);

    public static File multipartToFile(MultipartFile multipartFile) {
        File file = new File(multipartFile.getOriginalFilename());
        try (FileOutputStream os = new FileOutputStream(file)) {
            os.write(multipartFile.getBytes());
            return file;
        } catch (Exception err) {
            System.out.println("IoImage error");
        }
        return null;
    }

    public static BufferedImage fileToBufferedImage(File file) {
        try {
            BufferedImage image = ImageIO.read(file);
            return image;
        } catch (Exception err) {
            System.out.println("Error fileToBufferedImage");
            return null;
        }
    }

    public File BufferedImageconvertToFile(BufferedImage image, String name, String format) {
        File file = new File(String.format("%s_%s", System.currentTimeMillis(), name));
        try {
            ImageIO.write(image, format, file);
        } catch (Exception error) {
            System.out.println("Error convertToFile");
            return null;
        }
        return file;
    }
}
