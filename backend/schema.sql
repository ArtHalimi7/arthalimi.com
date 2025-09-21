-- MySQL schema for analytics backend
CREATE TABLE IF NOT EXISTS visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country VARCHAR(64) NOT NULL,
  timestamp DATETIME NOT NULL,
  page VARCHAR(128),
  user_agent VARCHAR(255),
  ip_address VARCHAR(64)
);
