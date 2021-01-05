UPDATE users
SET reset_password_token = $1,
    reset_password_expires = $2

WHERE email = $3
RETURNING *;


