CREATE DATABASE IF NOT EXISTS curador_db;
USE curador_db;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
);

INSERT INTO items (name, description)
VALUES ('Item inicial', 'Primer registro de ejemplo');

-- Usuario que la réplica usará para conectarse
CREATE USER 'replicator'@'%' IDENTIFIED BY 'replica_pass';
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%';
FLUSH PRIVILEGES;

