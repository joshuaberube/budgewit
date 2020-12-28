DO $$
BEGIN
    EXECUTE 'SELECT * FROM' || $1 || 'WHERE userId =' || $2 ||
END $$;