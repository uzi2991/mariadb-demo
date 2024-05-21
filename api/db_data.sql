-- MariaDB dump 10.19  Distrib 10.11.7-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: blog_app
-- ------------------------------------------------------
-- Server version	10.11.7-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES
(1,'minhnghia','minhnghia@gmail.com','$2a$10$TSluAzeWdMn/ONnh/lj5zOKIBR/G/B2K8gof7tOeW4qTjqXHXYGvu',NULL),
(2,'minhnghia1','minhnghia1@gmail.com','$2a$10$07BeilowL6gKD1q.wFKUGuvImtqowIy7/4bcJGH3cbr/66q3QXC9u',NULL),
(3,'account','account@gmail.com','$2a$10$zJFngnze2sw13MOluwuyUuFcGL6rV1/vTnt.NTgeCn.pd4CUFPJpy',NULL),
(4,'account1','account1@gmail.com','$2a$10$Fm9.UaxqcPfngmDug17Y2.22yqz7DehBvgOs430ns8yN9elhraqk6',NULL),
(5,'test','test@gmail.com','$2a$10$92K1sgU5mYlu6f6e1iJ33uXwjyb0zURK5HXqdYKuA.trB79q3mhIe',NULL);
UNLOCK TABLES;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES
(2,'Test Art','<p>llallallalallalal</p>','17132651760363497712.jpg','art','2024-04-04 19:48:22',1),
(3,'Test Science','<p>Science content</p>','1713265469918pexels-james-wheeler-417074.jpg','science','2024-04-16 16:20:43',1),
(4,'Test Tech','<p>Tech</p>','1713265513802pexels-james-wheeler-417074.jpg','technology','2024-04-16 16:24:15',1),
(5,'Test Cinema','<p>Cinema content</p>','17132600408443497712.jpg','cinema','2024-04-16 16:34:00',1),
(6,'Test Design','<p>Design</p>','1713260103711logo.png','','2024-04-16 16:35:03',1),
(7,'Test Long Post','<p class=\"ql-align-justify\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac massa non quam sagittis suscipit quis eu magna. Etiam tristique tempus magna, ut consequat tortor. Aliquam vitae mi eu metus bibendum porta. Donec in sem in nisi tincidunt dignissim pulvinar at leo. Pellentesque felis velit, pharetra ac nunc id, consequat mollis metus. Nulla eu lobortis augue, vitae bibendum libero. Donec placerat varius viverra. Fusce convallis at enim vel scelerisque. Sed sagittis placerat lorem, eu accumsan sapien sollicitudin et. Etiam dapibus lectus eget orci convallis sollicitudin. Mauris molestie est pretium, mattis nisl eget, rutrum felis. Donec placerat, ipsum ac porta venenatis, ante nulla auctor diam, et bibendum libero urna a quam. Nam dapibus dolor neque, id aliquam leo molestie nec. Praesent pharetra quis nibh fringilla tincidunt. Integer luctus at augue vel rhoncus.</p><p class=\"ql-align-justify\">Pellentesque lacus nisi, tincidunt eu feugiat quis, accumsan sed leo. Integer consectetur suscipit ligula ac facilisis. Curabitur lorem nisl, porta eu nulla vitae, commodo elementum leo. Pellentesque efficitur, tortor et porttitor facilisis, sem enim dictum orci, nec fermentum ex mi nec justo. Nam fringilla semper ornare. Vivamus libero enim, ultrices a libero quis, tincidunt mollis magna. In eu bibendum ligula. Nulla vehicula, velit sit amet sollicitudin fringilla, tortor tortor euismod nisl, a dapibus orci dui id tortor. Vestibulum consectetur erat non tincidunt finibus.</p><p class=\"ql-align-justify\">Donec in ex mollis, mollis lectus eget, mollis metus. Sed suscipit libero in molestie dignissim. Mauris enim felis, egestas in tellus ac, vulputate auctor justo. Fusce semper odio et dolor iaculis varius. Praesent ornare tincidunt hendrerit. Suspendisse tellus purus, laoreet id neque id, fermentum egestas dolor. Sed tempor massa quis nisl vestibulum, vel tempor neque eleifend. Maecenas eget nunc in purus varius ultricies. Fusce malesuada diam non mauris volutpat, et lacinia quam fermentum. In porttitor elit eu ex accumsan imperdiet. Sed sed nisi vel ante cursus rutrum non ut ipsum.</p><p class=\"ql-align-justify\">Fusce accumsan erat eget eros lobortis, eget ultricies ante maximus. Aliquam erat volutpat. Cras ultricies augue vel libero vulputate, eu fermentum massa tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi viverra porta volutpat. Praesent nulla quam, scelerisque ac leo at, dapibus cursus leo. Proin imperdiet accumsan cursus. Praesent aliquam quam eu urna placerat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed gravida id neque eget faucibus.</p><p class=\"ql-align-justify\">Sed sodales nisl in dolor rhoncus sollicitudin. In euismod non mi rutrum ultricies. Suspendisse nibh ipsum, pellentesque a leo quis, placerat tempus enim. Donec dolor diam, accumsan eget orci vel, faucibus commodo quam. Aliquam ligula nulla, venenatis id tempor ut, egestas aliquet sem. Nam enim ligula, iaculis tempor orci sed, mollis vestibulum nunc. Sed mollis, lorem et condimentum ornare, mauris nisi mattis nisi, sed condimentum purus dolor eu lacus.</p><p><br></p>','17134418654193497712.jpg','food','2024-04-18 19:04:25',2),
(8,'Title 1','<p>conetetete</p>','17152601348063497712.jpg','art','2024-05-09 20:08:55',1),
(11,'Test Post Noti','<p><br></p><p><br></p><p class=\"ql-align-justify\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus erat arcu, non euismod lorem vestibulum auctor. Donec a velit turpis. Maecenas nulla mi, hendrerit eu neque in, euismod tincidunt erat. Nulla at fermentum lacus, et elementum ipsum. Mauris id laoreet dui. Mauris lacinia velit non pretium eleifend. In ut sollicitudin est. Donec in hendrerit eros, at pharetra augue. Suspendisse semper rutrum est vel rutrum. Phasellus mattis diam dui, nec egestas mauris rutrum eu. In hac habitasse platea dictumst.</p><p class=\"ql-align-justify\">Curabitur interdum placerat erat et bibendum. Donec rhoncus nisi ut sem rhoncus, vel consequat enim rhoncus. Donec eget porttitor orci, mollis maximus tortor. Donec ac orci non arcu placerat blandit. Mauris sit amet massa fringilla, auctor lacus vel, luctus turpis. Fusce eleifend, leo ut bibendum vehicula, risus tortor volutpat orci, in pellentesque tortor nunc eu sapien. Phasellus scelerisque elementum libero non auctor. In sed ex quis magna pellentesque hendrerit at et neque. Mauris interdum aliquam placerat. Donec sagittis, quam ac efficitur accumsan, metus tortor mattis leo, nec placerat magna nisl sed purus. Vestibulum vel nibh tincidunt turpis sodales sagittis. Phasellus eleifend est nunc, a tincidunt ante egestas non. Fusce hendrerit sed nunc sit amet aliquet.</p><p><br></p>','17156937321273497712.jpg','science','2024-05-14 20:35:32',1),
(19,'Test Post','<p>1111</p>','17160344775283497712.jpg','art','2024-05-17 19:38:25',1),
(25,'Post','<p>2111</p>','17160346136243497712.jpg','food','2024-05-18 19:16:28',1),
(30,'TEst Noti','<p>content</p>','1716043023365czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGR2YW5nb2doLXNudmdyb2IuanBn.webp','science','2024-05-18 21:37:03',1),
(31,'Test Design Post','<p><span style=\"background-color: rgb(255, 255, 255);\">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</span></p>','1716098239784czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGR2YW5nb2doLXNudmdyb2IuanBn.webp','design','2024-05-19 12:57:19',1),
(32,'Test Food Post','<p><span style=\"background-color: rgb(255, 255, 255);\">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</span></p>','1716098287694download.jpg','food','2024-05-19 12:58:07',1),
(34,'Test Post Noti','<p>content....</p>','1716104622305download.jpg','technology','2024-05-19 14:43:42',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES
(1,'<p>Test comment</p>','minhnghia','2024-04-16 16:35:54',1,2),
(2,'<p>Comments 2</p>','minhnghia','2024-04-16 16:45:45',1,2),
(3,'<p>New Comment</p>','minhnghia1','2024-04-18 19:03:02',2,2),
(4,'<p>comment 1</p>','minhnghia','2024-05-09 19:41:22',1,7),
(5,'<p>comment 2</p>','minhnghia','2024-05-09 20:08:19',1,7),
(6,'<p>comment 2</p>','minhnghia','2024-05-09 20:09:16',1,6),
(7,'<p>Comment 1</p>','minhnghia1','2024-05-16 17:03:30',2,11),
(8,'<p>Comment 2</p>','minhnghia','2024-05-16 17:06:34',1,11),
(9,'<p>Comment 3</p>','minhnghia','2024-05-16 17:07:05',1,11),
(10,'<p>comment 2</p>','minhnghia','2024-05-16 17:16:20',1,11),
(11,'<p>Comment 1</p>','account1','2024-05-18 21:35:50',4,19),
(12,'<p>comment 2</p>','account1','2024-05-18 21:35:58',4,19),
(13,'<p>comment 2</p>','account1','2024-05-18 21:37:32',4,30),
(14,'<p>comment 1</p>','test','2024-05-19 14:42:25',5,5),
(15,'<p>comment 2</p>','test','2024-05-19 14:42:30',5,5),
(16,'<p>comment test</p>','test','2024-05-19 14:44:12',5,34);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES
(14,2,1),
(16,4,1),
(17,5,1);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES
(1,'minhnghia created a new post','/post/11',2,0,'2024-05-14 20:35:32'),
(2,'minhnghia commented on your post.','/post/11',1,1,'2024-05-16 17:07:05'),
(3,'minhnghia commented on your post.','/post/11#c10',1,1,'2024-05-16 17:16:21'),
(4,'minhnghia created a new post','/post/13',2,0,'2024-05-17 19:31:01'),
(5,'minhnghia created a new post','/post/14',2,0,'2024-05-17 19:31:59'),
(6,'minhnghia created a new post','/post/15',2,0,'2024-05-17 19:33:42'),
(7,'minhnghia created a new post','/post/16',2,0,'2024-05-17 19:34:29'),
(8,'minhnghia created a new post','/post/17',2,0,'2024-05-17 19:35:54'),
(9,'minhnghia created a new post','/post/18',2,0,'2024-05-17 19:36:28'),
(10,'minhnghia created a new post','/post/19',2,0,'2024-05-17 19:38:26'),
(11,'minhnghia created a new post','/post/20',2,0,'2024-05-18 19:07:17'),
(12,'minhnghia created a new post','/post/21',2,0,'2024-05-18 19:09:49'),
(13,'minhnghia created a new post','/post/22',2,0,'2024-05-18 19:10:29'),
(14,'minhnghia created a new post','/post/23',2,0,'2024-05-18 19:12:09'),
(15,'minhnghia created a new post','/post/24',2,1,'2024-05-18 19:13:40'),
(16,'minhnghia created a new post','/post/25',2,1,'2024-05-18 19:16:28'),
(17,'account1 commented on your post.','/post/19#c11',1,1,'2024-05-18 21:35:50'),
(18,'account1 commented on your post.','/post/19#c12',1,1,'2024-05-18 21:35:58'),
(19,'minhnghia created a new post','/post/30',2,0,'2024-05-18 21:37:03'),
(20,'minhnghia created a new post','/post/30',4,1,'2024-05-18 21:37:03'),
(21,'account1 commented on your post.','/post/30#c13',1,1,'2024-05-18 21:37:32'),
(22,'minhnghia created a new post','/post/31',2,0,'2024-05-19 12:57:20'),
(23,'minhnghia created a new post','/post/31',4,0,'2024-05-19 12:57:20'),
(24,'minhnghia created a new post','/post/32',2,0,'2024-05-19 12:58:08'),
(25,'minhnghia created a new post','/post/32',4,0,'2024-05-19 12:58:08'),
(26,'test commented on your post.','/post/5#c14',1,0,'2024-05-19 14:42:25'),
(27,'test commented on your post.','/post/5#c15',1,0,'2024-05-19 14:42:30'),
(28,'minhnghia created a new post','/post/34',2,0,'2024-05-19 14:43:42'),
(29,'minhnghia created a new post','/post/34',4,0,'2024-05-19 14:43:42'),
(30,'minhnghia created a new post','/post/34',5,1,'2024-05-19 14:43:42'),
(31,'test commented on your post.','/post/34#c16',1,1,'2024-05-19 14:44:13');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;




