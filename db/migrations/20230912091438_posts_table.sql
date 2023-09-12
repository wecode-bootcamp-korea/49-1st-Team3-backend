-- migrate:up
CREATE TABLE threads (
    id INT NOT NULL AUTO_INCREMENT, 
    users_id VARCHAR(10000000) NOT NULL, 
    contents VARCHAR(10000000) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id))
    FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
-- migrate:down

