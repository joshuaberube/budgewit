SELECT * FROM users
WHERE reset_password_token = $1;



-- SELECT user_id, email, reset_password_expires, reset_password_token FROM users 
-- WHERE reset_password_token = ${resetPasswordToken}
-- RETURNING *