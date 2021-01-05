UPDATE users
SET api_key = $2
WHERE user_id = $1;