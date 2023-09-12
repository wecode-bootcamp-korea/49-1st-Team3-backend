-- migrate:up
CREATE TABLE likes ( 
    id INT NOT NULL AUTO_INCREMENT, 
    threads_id VARCHAR(10000000) NOT NULL, 
    users_id VARCHAR(10000000) NOT NULL,
    comments_id VARCHAR(10000000) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), PRIMARY KEY (id))
    FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
    FOREIGN KEY (`threads_id`) REFERENCES `threads` (`id`)
    FOREIGN KEY (`comments_id`) REFERENCES `comments` (`id`)
-- migrate:down

