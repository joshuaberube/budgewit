CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    transaction_amount INT NOT NULL,
    transaction_category VARCHAR(100) NOT NULL,
    transaction_date DATE DEFAULT CURRENT_DATE,
    iso_currency_code VARCHAR(50) NOT NULL,
    pending BOOLEAN NOT NULL,
    transaction_title VARCHAR(250) NOT NULL,
    transaction_desc VARCHAR(500),
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO transactions (
      transaction_amount,
    transaction_category,
    transaction_date,
    iso_currency_code,
    pending,
    transaction_title,
    transaction_desc,
    user_id I
) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)