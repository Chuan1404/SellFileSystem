package com.server.backend.utils;

import com.server.backend.dto.response.ErrorResponse;
import com.server.backend.dto.response.Message;
import com.server.backend.enums.FileQuality;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;


@Component
@Getter
public class ImageHandler extends FileHandler {
    public static double avatar = 180;
    public static double display = 640;
    public static double medium = 1280;
    public static double high = 1920;
    public static double minimumPixels = 3000;

    @Override
    public ResponseEntity<?> checkFile(File file) {
        BufferedImage rootImage = fileToBufferedImage(file);
        if (rootImage == null)
            return ResponseEntity.badRequest().body(ErrorResponse.builder().error("Read file fail").build());
        if (rootImage.getHeight() < minimumPixels && rootImage.getWidth() < minimumPixels)
            return ResponseEntity.badRequest().body(ErrorResponse.builder().error(String.format("Yêu cầu chất lượng tối thiểu %.0f pixels. Hiện tại là %dx%d", minimumPixels, rootImage.getWidth(), rootImage.getHeight())).build());
        return ResponseEntity.ok(Message.builder().message("Success").build());
    }

    @Override
    public File resizedFile(File file, double targetWidth) {
        BufferedImage rootImage = fileToBufferedImage(file);

        double originWidth = rootImage.getWidth();
        double originHeight = rootImage.getHeight();
        double rate = originWidth > originHeight ? originHeight / originWidth : originWidth / originHeight;
        double targetHeight = Math.round(targetWidth * rate);

        if (originWidth < originHeight) {
            double tam = targetWidth;
            targetWidth = targetHeight;
            targetHeight = tam;
        }
        return resizedFile(file, targetWidth, targetHeight);
    }

    public File resizedFile(File file, double targetWidth, double targetHeight) {
        String format = getFileExtension(file);
        BufferedImage rootImage = fileToBufferedImage(file);

        Image image = rootImage.getScaledInstance((int) targetWidth, (int) targetHeight, Image.SCALE_SMOOTH);

        BufferedImage resizedImage = new BufferedImage((image.getWidth(null)), image.getHeight(null), BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = resizedImage.createGraphics();
        graphics2D.drawImage(image, 0, 0, null);
        graphics2D.dispose();

        File resizedImageFile = BufferedImageconvertToFile(resizedImage, file.getName(), format);
        return resizedImageFile;
    }

    @Override
    public File addCopyRight(File file) {

        String format = getFileExtension(file);
        BufferedImage rootImage = fileToBufferedImage(file);
        BufferedImage overlay = null;
        try {
            overlay = ImageIO.read(new File("watermark2.png"));
        } catch (IOException err){}


        // paint both images, preserving the alpha channels
        Graphics g = rootImage.getGraphics();
        g.drawImage(overlay, 0, 0, null);

        g.dispose();
        File copyRight = BufferedImageconvertToFile(rootImage, file.getName(), format);
        return copyRight;
    }


    public double getSize(FileQuality fileQuality) {
        double value = 0;
        switch (fileQuality) {
            case HIGH -> value = high;
            case MEDIUM -> value = medium;
            case DISPLAY -> value = display;
        }
        return value;
    }

}
