-- migrate:up

CREATE TABLE users {
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    nickname VARCHAR(200) NOT NULL,
    profile_image VARCHAR(1000) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id)
}

CREATE TABLE threads {
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    content VARCHAR(2000) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
}

CREATE TABLE likes {
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    thread_id INT NOT NULL,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (thread_id) REFERENCES threads (id)

}

CREATE TABLE comments {
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    thread_id INT NOT NULL,
    comment VARCHAR(2000) NULL,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    PRIMARY KEY (id)
    FOREIGN KEY (thread_id) REFERENCES threads (id)
}


-- migrate:down

