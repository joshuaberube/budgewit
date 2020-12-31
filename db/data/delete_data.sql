--UPDATE TO USE FORMAT

DO $$
BEGIN
    EXECUTE 'DELETE FROM ' || $2 || 
    ' WHERE ' || regexp_replace($2, 's(?!\\S)', '') || '_id = ' || $3 ||
    ' AND user_id = ' || $1;
END $$;

-- DO $$
-- BEGIN
--     EXECUTE format('DELETE FROM %I WHERE '||regexp_replace($2, 's(?!\\S)', '')||'_id = $3 AND user_id = $1', $2) 
--     USING $1, $2, $3;
-- END $$;