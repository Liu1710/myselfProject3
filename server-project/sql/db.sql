--drop database if exists db;
--create database db charset utf8;

--drop table if exists db.user;
--create table db.user(
  --id INT AUTO_INCREMENT PRIMARY KEY COMMENT "id, PK",
  --email VARCHAR(255) NOT NULL UNIQUE COMMENT "邮箱, UN NN",
  --password VARCHAR(255) NOT NULL COMMENT "密码, NN"
--)comment"用户表"

--SELECT * FROM db.user;

DROP DATABASE IF EXISTS shopping;
CREATE DATABASE shopping CHARACTER SET UTF8;

DROP TABLE IF EXISTS user;
CREATE TABLE shopping.user(
   id INT AUTO_INCREMENT PRIMARY KEY COMMENT "id, PK",
   username VARCHAR(20) UNIQUE COMMENT "用户名, UN",
   email VARCHAR(255) UNIQUE COMMENT "邮件, UN",
   mobile VARCHAR(11) UNIQUE COMMETN "手机号, UN",
   password VARCHAR(64) NOT NULL COMMENT "密码, NN",
   avatar VARCHAR(20) DEFAULT 'default.png' COMMENT "头像文件",
   nick VARCHAR(20) UNIQUE COMMENT "用户昵称, UN",
   gender CHAR(2) COMMENT "用户性别",
   dob DATE COMMENT "出生日期"
)COMMENT "用户表";

DROP TABLE IF EXISTS product;
CREATE TABLE shopping.product(
   id INT AUTO_INCREMENT PRIMARY KEY COMMENT "id, PK",
   title VARCHAR(255) NOT NULL COMMENT "商品名称, NN",
   coverPicture VARCHAR(255) NOT NULL COMMENT "封面图片, NN",
   price DECIMAL(8,2)  NOT NULL COMMENT "商品价格, NN",
   brief VARCHAR(255) COMMENT "商品简介",
   featuer VARCHAR(255) COMMENT "商品特色",
   tags VARCHAR(255) COMMENT "商品标签",
   type VARCHAR(255) COMMENT "商品类别"
)COMMENT "商品表";

DROP PROCEDURE IF EXISTS product_sample_data;
DELIMITER $$;
CREATE PROCEDURE shopping.product_sample_data()
   BEGIN
      DECLARE counter INT DEFAULT 1;
      WHILE counter<1001 DO
        INSERT INTO shopping.product(title,coverPicture,price) VALUE(
            CONCAT("商品名称:",counter),
            "default.png",
            FLOOR(RAND()*100000)
        );
      SET counter = counter+1;
     END WHILE;
   END $$;
CALL shopping.product_sample_data;

