-- CREATE DATABASE
create database file_system;

use file_system;


create table `user` (
	`id` varchar(100) primary key default(uuid()),
    `email` varchar(100) unique not null,
    `password` text,
    `avatar` text,
    `name` text,
    `state` varchar(20),
    `created_date` datetime not null
);

create table `role`(
	`id` int primary key auto_increment,
    `name` varchar(50) not null
);

insert into `role` values(1,"ROLE_ADMIN");
insert into `role` values(2, "ROLE_CUSTOMER");
insert into `role` values(3, "ROLE_EDITOR");

create table `refresh_token` (
	`id` int primary key auto_increment,
    `token` text not null,
    `expire_date` datetime not null,
    `user_id` varchar(100),
    constraint fk_token_user foreign key(`user_id`) references `user`(`id`) on delete set null
);
create table `verification_code`(
	`id` int primary key auto_increment,
    `value` text not null,
    `user_id` varchar(100),
    constraint fk_code_user foreign key(`user_id`) references `user`(`id`) on delete set null
);
create table `file` (
	`id` int primary key auto_increment,
    `price` double not null default 0,
    `is_active` bit default 1 not null,
    `root` text,
    `medium` text,
	`high` text,
    `display` text,
    `type` varchar(100),
    `size` long,
    `width` int,
    `height` int,
    `user_id` varchar(100),
    
    -- delete user, file not 
    constraint fk_file_user foreign key(`user_id`) references `user`(`id`) on delete set null
);


create table `usage_right` (
	`id` int primary key auto_increment,
    `file_id` int,
    `user_id` varchar(100),
    `expire_date` datetime,
	constraint fk_right_user foreign key(`user_id`) references `user`(`id`) on delete cascade,
	constraint fk_right_file foreign key(`file_id`) references `file`(`id`)
);

create table `favorite` (
	`id` int primary key auto_increment,
    `file_id` int,
    `user_id` varchar(100),
    constraint fk_favorite_user foreign key(`user_id`) references `user`(`id`) on delete cascade
);

create table `receipt` (
	`id` int primary key auto_increment,
    `total_price` double not null,
    `created_date` datetime not null,
    `method` varchar(20) not null,
    `user_id` varchar(100),
    
    constraint fk_receipt_user foreign key(`user_id`) references `user`(`id`) on delete set null
);

create table `comment` (
	`id` int primary key auto_increment,
    `content` text not null,
    `created_date` datetime not null,
    `user_id` varchar(100),
    `file_id` int,
    
    constraint fk_comment_user foreign key(`user_id`) references `user`(`id`) on delete cascade,
    constraint fk_commnet_file foreign key(`file_id`) references `file`(`id`) on delete cascade
);


create table `tag` (
	`id` int primary key auto_increment,
    `name` varchar(50) not null
);


   


