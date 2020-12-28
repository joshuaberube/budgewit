DO $$
BEGIN
    EXECUTE 'DELETE FROM ' || $1 || 
    ' WHERE ' || regexp_replace($1, 's(?!\\S)', '') || '_id = ' || $3 ||
    ' AND user_id = ' || $2;
END $$;