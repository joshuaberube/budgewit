INSERT INTO users (email, password, first_name, last_name, phone_num)
VALUES (${email}, ${password}, ${firstName}, ${lastName}, ${phoneNum})
RETURNING user_id, email, first_name, last_name, phone_num;