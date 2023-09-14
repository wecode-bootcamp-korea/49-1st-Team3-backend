-- migrate:up
CREATE TABLE threads (
    id INT NOT NULL AUTO_INCREMENT, 
    user_id INT NOT NULL, -- Assuming user_id is an integer and references the 'id' column in the 'users' table
    content TEXT NOT NULL, -- Using TEXT for variable-length text content
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Using CURRENT_TIMESTAMP for default value
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP, -- Using DEFAULT NULL for 'updated_at'
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) -- Correcting foreign key syntax
);

-- migrate:down


