-- migrate:up
CREATE TABLE users ( 
    id INT NOT NULL AUTO_INCREMENT, 
    nickname VARCHAR(50) NULL, 
    email VARCHAR(200) NOT NULL, 
    profileImage VARCHAR(1000) NULL,
    phoneNumber VARCHAR(1000) NOT NULL,
    birthday VARCHAR(1000) NOT NULL,
    password VARCHAR(200) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id))
-- migrate:down
