CREATE DATABASE  IF NOT EXISTS `groupomania`;
USE `groupomania`;


DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `dateCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Comment_user1_idx` (`user_id`),
  KEY `fk_Comment_post1_idx` (`post_id`),
  CONSTRAINT `fk_Comment_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Comment_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `dateCreate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_user_idx` (`user_id`),
  CONSTRAINT `fk_post_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;


INSERT INTO `user` VALUES (1,'4a2bae9101a5144712a41f21e0cbabb6','Alicia Keys (Admin)','$2b$10$EB1eONzitcaLgj1Q0adzseV0Nxk23QtakuA8MeyKTgr1V0.Xfay.2',1);


-- Dump completed on 2021-08-21 16:11:15
