DROP DATABASE IF EXISTS e_commerce_db;

CREATE DATABASE e_commerce_db;

USE e_commerce_db;

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(50) NOT NULL 
    -- VARCHAR means a string - 50 characters
);

CREATE TABLE product (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL 
    -- VARCHAR means a string - 50 characters
    price DECIMAL(8,2) NOT NULL,
    -- DECIMAL (8,2)- this means they will take 8 digits and 2 decimal points ONLY
    stock INT NOT NULL DEFAULT(10)
    category_id INT,
    CONSTRAINT category_idfk FOREIGN KEY 
    (category_id) REFERENCES category(id)
);

CREATE TABLE Tag (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tag_name VARCHAR(50)
    -- VARCHAR means a string - 50 characters
);

CREATE TABLE ProductTag (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_id INT, 
    tag_id INT,
    CONSTRAINT product_idfk FOREIGN KEY 
    (product_id) REFERENCES product(id),
    CONSTRAINT tag_idfk FOREIGN KEY 
    (tag_id) REFERENCES tag(id),
);

-- up on the line above- the name of the CONSTRAINT is the departmentfk - which means department foreign key. 
-- CONSTRAINT - confirming that a matching department exists for this ID. Also its a limitation cuz you cannot add information if the same information is not in the other table. 

