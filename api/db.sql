-- setup_mysql.sql
-- create database
CREATE DATABASE IF NOT EXISTS blog_app;
-- create table users
CREATE TABLE IF NOT EXISTS `blog_app`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255) NULL,
  PRIMARY KEY (`id`)
);
-- create table posts
CREATE TABLE IF NOT EXISTS `blog_app`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `desc` TEXT NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `cat` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `uid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `uid_idx` (`uid` ASC) VISIBLE,
  CONSTRAINT `uid`
  FOREIGN KEY (`uid`)
  REFERENCES `blog_app`.`users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

-- create table comments
CREATE TABLE IF NOT EXISTS `blog_app`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `uid` INT NOT NULL,
  `pid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `cmt_pid_idx` (`pid` ASC) VISIBLE,
  CONSTRAINT `cmt_pid`
    FOREIGN KEY (`pid`)
    REFERENCES `blog_app`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX `cmt_uid_idx` (`uid` ASC) VISIBLE,
  CONSTRAINT `cmt_uid`
    FOREIGN KEY (`uid`)
    REFERENCES `blog_app`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `blog_app`.`followers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `follower_id` INT NOT NULL,
  `followee_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`followee_id`) REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `blog_app`.`notifications` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `uid` INT NOT NULL,
  `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
  `date` DATETIME NOT NULL,
  FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
);