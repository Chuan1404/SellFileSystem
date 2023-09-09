package com.server.backend.services;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.server.backend.enums.FileQuality;
import com.server.backend.repositories.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import javax.imageio.ImageIO;

@Service
public class AmazonS3Service {
    @Value("${aws.s3.bucket.public.name}")
    private String bucketName;

    @Value("${aws.s3.bucket.public.name}")
    private String publicBucket;

    @Value("${aws.s3.bucket.private.name}")
    private String privateBucket;

    @Autowired
    private AmazonS3 amazonS3;

    public String uploadFile(File file, FileQuality quality) {
        String currentBucket = quality != FileQuality.ROOT ? publicBucket : privateBucket;
        // bucket/type/folder/file
        String path = String.format("images/%s/%s", quality.name().toLowerCase(), file.getName());

        PutObjectRequest putObjectRequest = new PutObjectRequest(currentBucket, path, file);
        PutObjectResult result = amazonS3.putObject(putObjectRequest);

        URL s3Url = amazonS3.getUrl(currentBucket, path);
        file.delete();

        return s3Url.toString();
    }

    public byte[] downloadFile(String filename) {
        S3Object s3Object = amazonS3.getObject(bucketName, filename);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }


    public String deleteFile(String filename) {
        amazonS3.deleteObject(bucketName, filename);
        return filename + " removed";
    }
}
