DO $$
BEGIN
    EXECUTE format('DELETE FROM %I WHERE %s = %L AND user_id = %L', 
        $2, regexp_replace($2, 's$', '_id'), $3, $1);
END $$;