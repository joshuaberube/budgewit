DO $$
BEGIN
    EXECUTE 'SELECT * FROM' || $2 || 'WHERE user_id =' || $1;
END $$;