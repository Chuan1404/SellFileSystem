DROP DATABASE IF EXISTS `file_system`;
CREATE DATABASE `file_system`;
USE `file_system`;

-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: file_system
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `file_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_user` (`user_id`),
  KEY `fk_commnet_file` (`file_id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_commnet_file` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Con kì nhông đẹp quá','2023-10-23 22:15:18.398357','b64c2d0c-baac-4150-aaad-b8fa39ad46b7',2),(2,'<3','2023-10-23 22:16:05.706983','2a64cb61-5cd2-43a8-9fe4-138a3e857900',2),(3,'ảnh đẹp !!','2023-10-23 22:16:41.686388','8062d50c-8c32-41fa-aad1-579ed97bbcf0',2),(4,'wow !!\nnice !!','2023-10-23 22:17:08.748221','8062d50c-8c32-41fa-aad1-579ed97bbcf0',2);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_id` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_favorite_user` (`user_id`),
  KEY `FKeov6qv86vhcyhban111gqgeg8` (`file_id`),
  CONSTRAINT `fk_favorite_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKeov6qv86vhcyhban111gqgeg8` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_seq`
--

DROP TABLE IF EXISTS `favorite_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_seq`
--

LOCK TABLES `favorite_seq` WRITE;
/*!40000 ALTER TABLE `favorite_seq` DISABLE KEYS */;
INSERT INTO `favorite_seq` VALUES (1);
/*!40000 ALTER TABLE `favorite_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` double DEFAULT NULL,
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `root` varchar(255) DEFAULT NULL,
  `medium` varchar(255) DEFAULT NULL,
  `high` varchar(255) DEFAULT NULL,
  `display` varchar(255) DEFAULT NULL,
  `type` enum('JPEG','PNG') DEFAULT NULL,
  `size` bigint NOT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_file_user` (`user_id`),
  CONSTRAINT `fk_file_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,100000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/eagle-owl-8274405.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073062728_1698073062555_eagle-owl-8274405.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073066954_1698073066760_eagle-owl-8274405.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073070648_eagle-owl-8274405.jpg','JPEG',8580953,6000,4000,'29c48585-f154-4307-a50a-426c006f4085','con cú'),(2,150000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/iguana-8283668.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073097016_1698073096835_iguana-8283668.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073100766_1698073100501_iguana-8283668.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073104022_iguana-8283668.jpg','JPEG',9165732,5219,3724,'29c48585-f154-4307-a50a-426c006f4085','con kỳ nhông'),(3,200000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/cat-8130334.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073107864_1698073107708_cat-8130334.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073110847_1698073110656_cat-8130334.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073113426_cat-8130334.jpg','JPEG',2219887,6000,4000,'29c48585-f154-4307-a50a-426c006f4085','con mèo'),(4,300000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/donkey-cart-8269449.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073124609_1698073124425_donkey-cart-8269449.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073127185_1698073126938_donkey-cart-8269449.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073129244_donkey-cart-8269449.jpg','JPEG',4318964,4222,2815,'29c48585-f154-4307-a50a-426c006f4085','con lừa kéo xe'),(5,200000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/dahlias-8215514.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073138265_1698073138111_dahlias-8215514.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073141414_1698073141200_dahlias-8215514.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073143730_dahlias-8215514.jpg','JPEG',2410308,3760,5548,'29c48585-f154-4307-a50a-426c006f4085','bông hoa'),(6,300000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/IMG_4881.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073162220_1698073162070_IMG_4881.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073166748_1698073166509_IMG_4881.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073171196_IMG_4881.jpg','JPEG',17090515,4000,6000,'29c48585-f154-4307-a50a-426c006f4085','cô gái đọc sách'),(7,400000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/IMG_4863.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073189843_1698073189676_IMG_4863.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073194479_1698073194232_IMG_4863.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073198522_IMG_4863.jpg','JPEG',11526878,6000,4000,'29c48585-f154-4307-a50a-426c006f4085','cái ghế dưới nắng'),(8,500000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/IMG_4743.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073229044_1698073228849_IMG_4743.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073234046_1698073233804_IMG_4743.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073238377_IMG_4743.jpg','JPEG',18101866,6000,4000,'29c48585-f154-4307-a50a-426c006f4085','cô gái đọc sách dưới nắng'),(9,300000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/IMG_4861.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073247560_1698073247391_IMG_4861.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073252302_1698073252049_IMG_4861.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073256264_IMG_4861.jpg','JPEG',11786655,6000,4000,'29c48585-f154-4307-a50a-426c006f4085','cái ghế'),(10,300000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/IMG_4859.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073265528_1698073265385_IMG_4859.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073270105_1698073269862_IMG_4859.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073274242_IMG_4859.jpg','JPEG',11386468,6000,4000,'29c48585-f154-4307-a50a-426c006f4085','cái ghế 2'),(11,600000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/river-8279466.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073290108_1698073289949_river-8279466.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073293304_1698073293051_river-8279466.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073295899_river-8279466.jpg','JPEG',4987386,5568,3632,'29c48585-f154-4307-a50a-426c006f4085','rừng và suối'),(12,700000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/pumpkins-8287968.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073301759_1698073301586_pumpkins-8287968.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073304960_1698073304698_pumpkins-8287968.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073307654_pumpkins-8287968.jpg','JPEG',2725986,5967,3731,'29c48585-f154-4307-a50a-426c006f4085','bí ngô'),(13,400000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/nature-8217030.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073318525_1698073318363_nature-8217030.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073321451_1698073321216_nature-8217030.jpg','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073323624_nature-8217030.jpg','JPEG',986802,5184,3456,'29c48585-f154-4307-a50a-426c006f4085','con tắc kè'),(14,100000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/phone-1682317.png','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073975041_1698073974862_phone-1682317.png','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073977499_1698073977267_phone-1682317.png','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073979561_phone-1682317.png','PNG',643878,3000,4450,'29c48585-f154-4307-a50a-426c006f4085','Điện thoại không nền'),(15,200000,_binary '','https://devchu-filesell-private.s3.ap-southeast-1.amazonaws.com/images/root/pinup-1729057.png','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/medium/1698073984225_1698073984078_pinup-1729057.png','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/high/1698073985887_1698073985657_pinup-1729057.png','https://devchu-filesell-public.s3.ap-southeast-1.amazonaws.com/images/display/1698073986984_pinup-1729057.png','PNG',502814,1921,3263,'29c48585-f154-4307-a50a-426c006f4085','cô gái hoạt hình');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_tag`
--

DROP TABLE IF EXISTS `file_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_tag` (
  `file_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`file_id`,`tag_id`),
  KEY `FK6d156ft7cdh7b90w5qrqnrgkc` (`tag_id`),
  CONSTRAINT `FK6d156ft7cdh7b90w5qrqnrgkc` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `FKplqieta0s10ytcjh5lwx3uobh` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_tag`
--

LOCK TABLES `file_tag` WRITE;
/*!40000 ALTER TABLE `file_tag` DISABLE KEYS */;
INSERT INTO `file_tag` VALUES (1,1),(2,1),(3,1),(4,1),(13,1),(1,2),(2,3),(3,4),(4,5),(5,6),(5,7),(6,7),(7,7),(8,7),(11,7),(6,8),(7,8),(8,8),(9,8),(10,8),(6,9),(7,10),(9,10),(7,11),(8,11),(8,12),(12,13),(13,14),(14,16),(15,17),(15,18);
/*!40000 ALTER TABLE `file_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_price` double DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `method` enum('MOMO') DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `momo_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_receipt_user` (`user_id`),
  CONSTRAINT `fk_receipt_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES (1,1200000,'2023-10-23 22:28:42.748166','MOMO','b64c2d0c-baac-4150-aaad-b8fa39ad46b7','DC_1698074870940'),(2,500000,'2023-12-23 22:29:38.919377','MOMO','b64c2d0c-baac-4150-aaad-b8fa39ad46b7','DC_1698074956027'),(3,100000,'2023-12-23 22:31:37.718507','MOMO','b64c2d0c-baac-4150-aaad-b8fa39ad46b7','DC_1698075074477'),(4,200000,'2023-09-23 22:31:37.718507','MOMO',NULL,NULL),(5,600000,'2023-08-23 22:31:37.718507','MOMO',NULL,NULL),(6,250000,'2023-07-23 22:31:37.718507','MOMO',NULL,NULL),(7,300000,'2023-06-23 22:31:37.718507','MOMO',NULL,NULL),(8,700000,'2023-05-23 22:31:37.718507','MOMO',NULL,NULL),(9,400000,'2023-04-23 22:31:37.718507','MOMO',NULL,NULL),(10,800000,'2023-03-23 22:31:37.718507','MOMO',NULL,NULL),(11,100000,'2023-02-23 22:31:37.718507','MOMO',NULL,NULL),(12,350000,'2023-01-23 22:31:37.718507','MOMO',NULL,NULL),(13,900000,'2022-12-23 22:31:37.718507',NULL,NULL,NULL),(14,500000,'2022-11-23 22:31:37.718507',NULL,NULL,NULL);
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_file`
--

DROP TABLE IF EXISTS `receipt_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt_file` (
  `receipt_id` int NOT NULL,
  `file_id` int NOT NULL,
  PRIMARY KEY (`receipt_id`,`file_id`),
  KEY `FKbkls8cf78ppbw3ief32rd2hv0` (`file_id`),
  CONSTRAINT `FKbkls8cf78ppbw3ief32rd2hv0` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`),
  CONSTRAINT `FKm7ndby680mar3jn7ax5xmiots` FOREIGN KEY (`receipt_id`) REFERENCES `receipt` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_file`
--

LOCK TABLES `receipt_file` WRITE;
/*!40000 ALTER TABLE `receipt_file` DISABLE KEYS */;
INSERT INTO `receipt_file` VALUES (1,1),(3,1),(1,3),(2,5),(1,10),(2,10),(1,11);
/*!40000 ALTER TABLE `receipt_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `expire_date` datetime(6) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_token_user` (`user_id`),
  CONSTRAINT `fk_token_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` enum('ROLE_ADMIN','ROLE_CUSTOMER','ROLE_EDITOR') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_CUSTOMER'),(3,'ROLE_EDITOR');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'động vật'),(2,'con cú'),(3,'con kỳ nhông'),(4,'con mèo'),(5,'con lừa'),(6,'hoa'),(7,'thiên nhiên'),(8,'màu xanh'),(9,'cô gái'),(10,'cái ghế'),(11,'nắng'),(12,'đọc sách'),(13,'bí ngô'),(14,'con tắc kè'),(16,'điện thoại'),(17,'2d'),(18,'cô giá');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usage_right`
--

DROP TABLE IF EXISTS `usage_right`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usage_right` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_id` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `expire_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_right_user` (`user_id`),
  KEY `fk_right_file` (`file_id`),
  CONSTRAINT `fk_right_file` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`),
  CONSTRAINT `fk_right_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usage_right`
--

LOCK TABLES `usage_right` WRITE;
/*!40000 ALTER TABLE `usage_right` DISABLE KEYS */;
INSERT INTO `usage_right` VALUES (1,1,'b64c2d0c-baac-4150-aaad-b8fa39ad46b7','2025-10-23 22:28:42.719962'),(2,3,'b64c2d0c-baac-4150-aaad-b8fa39ad46b7','2024-10-23 22:28:42.726817'),(3,11,'b64c2d0c-baac-4150-aaad-b8fa39ad46b7','2024-10-23 22:28:42.733369'),(4,10,'b64c2d0c-baac-4150-aaad-b8fa39ad46b7','2025-10-23 22:28:42.739300'),(5,5,'b64c2d0c-baac-4150-aaad-b8fa39ad46b7','2024-10-23 22:29:38.912519');
/*!40000 ALTER TABLE `usage_right` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` enum('BANNED','UNVERIFIED','VERIFIED') DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('29c48585-f154-4307-a50a-426c006f4085','editor01@gmail.com','$2a$10$CqiAGNgAw6NZQSXjMnIqiuHDPx9W2zku0Tn9mXxXUOHRK6kkOM4xm',NULL,'Editor 01','VERIFIED','2023-10-23 21:54:41.810811'),('2a64cb61-5cd2-43a8-9fe4-138a3e857900','admin@gmail.com','$2a$10$wh1YjgvLgW65OuDQtXyra.RJBQ79CaLTTtm2g1z7cdSUP/AEmukwW',NULL,'Aaministrator','VERIFIED','2023-10-23 21:54:19.519745'),('8062d50c-8c32-41fa-aad1-579ed97bbcf0','2051052006an@ou.edu.vn','','https://lh3.googleusercontent.com/a/ACg8ocKQsGyshJKFC2NdaCoBs7Lt9iQ1FJbaZaaq9-ujh8dB=s96-c','Ân Nguyễn Chu Phước','VERIFIED','2023-10-23 22:16:32.766920'),('b64c2d0c-baac-4150-aaad-b8fa39ad46b7','customer@gmail.com','$2a$10$d4P2QY2rJFyr36bqV7qVHOlVOxfVKw6ZQ3o5K4Ev848qmW.KL/AZG',NULL,'Customer','VERIFIED','2023-10-23 22:08:30.654331');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(255) NOT NULL,
  `role_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('29c48585-f154-4307-a50a-426c006f4085','ROLE_EDITOR'),('2a64cb61-5cd2-43a8-9fe4-138a3e857900','ROLE_ADMIN'),('8062d50c-8c32-41fa-aad1-579ed97bbcf0','ROLE_CUSTOMER'),('b64c2d0c-baac-4150-aaad-b8fa39ad46b7','ROLE_CUSTOMER');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_code`
--

DROP TABLE IF EXISTS `verification_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_code_user` (`user_id`),
  CONSTRAINT `fk_code_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_code`
--

LOCK TABLES `verification_code` WRITE;
/*!40000 ALTER TABLE `verification_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `verification_code` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-23 22:39:37
