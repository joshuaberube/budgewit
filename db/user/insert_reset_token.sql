UPDATE users
SET reset_password_token = $2,
reset_password_expires = $3,
WHERE email = $1
RETURNING *;
