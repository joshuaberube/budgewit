
INSERT INTO transactions (
      transaction_amount,
    transaction_category,
    transaction_date,
    iso_currency_code,
    pending,
    transaction_title,
    transaction_desc,
    user_id
) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;