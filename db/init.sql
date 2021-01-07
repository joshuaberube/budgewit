
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_num VARCHAR(25) NOT NULL,
    api_key VARCHAR(250),
    reset_password_token VARCHAR(250),
    reset_password_expires BIGINT
);


CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    goal_amount INT NOT NULL,
    goal_progress INT DEFAULT 0,
    goal_status BOOLEAN DEFAULT FALSE,
    goal_created DATE DEFAULT CURRENT_DATE,
    goal_last_edited DATE DEFAULT CURRENT_DATE,
    goal_end_date DATE NOT NULL,
    goal_title VARCHAR(250) NOT NULL,
    goal_desc VARCHAR(500) DEFAULT NULL,
    goal_account VARCHAR(200),
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE bills (
    bill_id SERIAL PRIMARY KEY,
    bill_name VARCHAR(250) NOT NULL,
    bill_amount INT NOT NULL,
    bill_status BOOLEAN DEFAULT FALSE,
    bill_category VARCHAR(250) NOT NULL,
    bill_interval INT,
    bill_due DATE NOT NULL,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE budgets (
    budget_id SERIAL PRIMARY KEY,
    budget_title VARCHAR(65) NOT NULL,
    budget_description VARCHAR(150),
    budget_category VARCHAR(100) NOT NULL,
    budget_amount INT NOT NULL,
    budget_frequency VARCHAR(10) NOT NULL,
    budget_current INT DEFAULT 0,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);



CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    transaction_amount INT NOT NULL,
    transaction_category TEXT NOT NULL,
    transaction_date DATE DEFAULT CURRENT_DATE,
    iso_currency_code VARCHAR(50) NOT NULL,
    pending BOOLEAN NOT NULL,
    transaction_title VARCHAR(250) NOT NULL,
    transaction_desc VARCHAR(500),
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    resource_title VARCHAR(250),
    resource_desc VARCHAR(500),
    resource_link VARCHAR(500),
    resource_category VARCHAR(100),
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO users (email, password, first_name, last_name, phone_num, api_key)
VALUES ('test@test.com', 'test', 'test', 'testt', '1+801-742-1223', 'apiTestKey');