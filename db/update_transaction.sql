UPDATE transactions 
SET transaction_amount = $1,
    transaction_category = $2,
    transaction_date  = $3,
    iso_currency_code = $4,
    pending = $5,
    transaction_title = $6,
    transaction_desc = $6
    WHERE transaction_id = $7;