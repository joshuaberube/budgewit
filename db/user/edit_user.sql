UPDATE users
SET email = ${email},
    first_name = ${first_name},
    last_name = ${last_name},
    phone_num = ${phone_num}
WHERE user_id = ${user_id}
RETURNING email, first_name, last_name, phone_num, user_id;