CREATE DATABASE  IF NOT EXISTS `cats`;
USE `cats`;

SET NAMES utf8 ;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` char(60) NOT NULL,
  `lastSeenAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_name` (`username`)
) ENGINE=InnoDB CHARSET=utf8;

DROP TABLE IF EXISTS `cats`;
CREATE TABLE `cats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birthDate` datetime DEFAULT NULL,
  `breed` varchar(45) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `imageUrl` varchar(256) DEFAULT NULL,
  `weight` decimal(5,2) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB CHARSET=utf8; 
