-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 12, 2025 at 12:48 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogproj`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `author`, `content`, `created_at`) VALUES
(1, 1, 'Comment Author', 'This is a test comment.', '2025-03-02 15:57:01'),
(2, 11, '@conquer', 'go hard bro!', '2025-03-02 16:11:50'),
(3, 13, 'Anonymous', 'test comment section', '2025-03-12 10:08:56'),
(4, 15, 'Anonymous', 'dfla', '2025-03-12 10:14:44'),
(5, 15, 'Anonymous', 'sdfldafn', '2025-03-12 10:14:49'),
(6, 13, 'elanrchy', 'dhd', '2025-03-12 10:32:16'),
(7, 13, 'mercy', 'nice wedding photo', '2025-03-12 10:41:05'),
(8, 15, 'mercy', 'kjg;', '2025-03-12 10:48:51'),
(9, 6, 'mercy', 'klj', '2025-03-12 11:06:36'),
(10, 6, 'mercy', 'l;;n', '2025-03-12 11:06:39'),
(11, 15, 'mercy', 'jkjk', '2025-03-12 11:21:24'),
(12, 13, 'mercy', ';nm', '2025-03-12 11:23:39'),
(13, 13, 'elanrchy', 'kl', '2025-03-12 12:44:30');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `likes` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `author`, `image`, `created_at`, `likes`) VALUES
(12, 'Test Post', 'This is a test post content.', 'Test Author', 'test-image.jpg', '2025-03-02 15:56:35', 2),
(6, 'sdfsdg', 'sdfgsdgsfsgsgsgafgasefhg', 'yonas', NULL, '2025-01-24 15:14:24', 0),
(7, ' continuing my blog project ', ' after some days i have continued my blog project  but this time i have started to do the front end also', 'BE Student', NULL, '2025-02-27 11:59:23', 0),
(9, ' sdsd', 'test', 'the be student', '/public/uploads/1740911082657.jpg', '2025-03-02 10:24:42', 0),
(11, 'full stack is bs!', 'i am building blog webpage but it is exhausting', 'be student', '/uploads/1740914694390.jpg', '2025-03-02 11:24:54', 17),
(13, 'building blog page with the crew', 'sodfndsaokfnsdl;vnldsnvlsd;nvsdl;vnds;lv ds;vds;lfsdfsv\r\nsdfas;dfklns;dkfsd;vlsdfv;sd;vsdvsdv;sdv', 'be student', '/uploads/1741772162022-1741696221768-1741696107102-3.jpg', '2025-03-12 09:36:02', 4),
(14, 'second semester is coming', 'it  feels it is gonna be hard ..', 'be student', '/uploads/1741773303129-download (4).jpeg', '2025-03-12 09:55:03', 1),
(15, 'The Weeknd', 'The Weeknd released his sixth studio album, \"Hurry Up Tomorrow,\" on January 31, 2025. \r\nEN.WIKIPEDIA.ORG\r\n This album serves as the concluding chapter of a trilogy that began with After Hours (2020) and continued with Dawn FM (2022). \r\nWIKIPEDIA\r\n\r\nMusical Style and Collaborations\r\n\r\n\"Hurry Up Tomorrow\" blends genres such as R&B, synth-pop, and trap, while also exploring Brazilian funk and hip-hop influences. The album features collaborations with artists including Justice, Anitta, Travis Scott, Florence and the Machine, Future, Playboi Carti, Giorgio Moroder, and Lana Del Rey. \r\nEN.WIKIPEDIA.ORG\r\n\r\nSingles and Promotion\r\n\r\nThe album was promoted through singles like \"Timeless,\" released on September 27, 2024, and \"São Paulo,\" featuring Anitta, released on October 30, 2024. \r\nEN.WIKIPEDIA.ORG\r\n Additionally, The Weeknd announced a psychological thriller film titled \"Hurry Up Tomorrow,\" starring himself alongside Jenna Ortega and Barry Keoghan, set for release on May 16, 2025. \r\nLOS40.COM\r\n\r\nCommercial Performance\r\n\r\nUpon release, \"Hurry Up Tomorrow\" debuted at number one on the Billboard 200, marking The Weeknd\'s fifth chart-topping album. The album achieved first-week sales of 490,500 album-equivalent units in the U.S., including 171.5 million streams and 359,000 pure album sales. \r\nEN.WIKIPEDIA.ORG\r\n Internationally, it reached number one in 16 countries, including Canada, France, Norway, Belgium, Australia, the United Kingdom, and New Zealand.\r\n\r\nCritical Reception\r\n\r\nCritics praised the album\'s ambitious production and thematic depth. The Guardian noted that, despite some heavy-handed lyrics, the album\'s diverse and innovative production techniques showcase The Weeknd\'s musical prowess. \r\nTHE GUARDIAN\r\n Overall, \"Hurry Up Tomorrow\" has been lauded as a fitting conclusion to The Weeknd\'s trilogy, reflecting his artistic evolution and willingness to explore complex themes.\r\n\r\nThe Weeknd', 'his fan', '/uploads/1741773640448-download (3).jpeg', '2025-03-12 10:00:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'elanrchy', '$2b$10$hsNtiXj3PmvekAAuv34kQeNoVtLAVf8v5QjLoka3pUbFqftOpnH3m'),
(2, 'mercy', '$2b$10$d4L.vzA2sY9uNx5awrCTHOEpcwOaJRbxyBuxg2VRrZiSAESCm8sQ6'),
(3, 'mihret', '$2b$10$azyauzK90.DBhjKVStNu/.nzOsv7fyMZISxca9k2zQk/ydpl6Xeha'),
(4, 'ela', '$2b$10$o636RZqxzxkgoGUF4qrIN.A7ZkSKQrWBq3BFpYdkgySc.ivRls36.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
