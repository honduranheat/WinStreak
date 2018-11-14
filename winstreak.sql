DROP DATABASE IF EXISTS winstreakdb;
CREATE DATABASE winstreakdb;
USE winstreakdb;

CREATE TABLE tasklist (
    id INT NOT NULL AUTO_INCREMENT,
    Goal VARCHAR(255),
    DaysCompleted VARCHAR(255) NULL,
    primary key(id)
);

insert into tasklist(Goal)
values('Code 1 hour Daily');