DO $$

DECLARE key_values VARCHAR(500);
DECLARE insert_values_var VARCHAR(1500);

BEGIN
    WITH body AS (
        SELECT string_agg(k, ', ') keys, string_agg(v, ', ') insert_values FROM (
            SELECT key k, value v
            FROM json_each_text($2)
        ) u
    )

    SELECT keys, insert_values INTO key_values, insert_values_var FROM body;

    EXECUTE 'INSERT INTO ' || $1 || ' (' || regexp_replace(key_values, '"', '') || ')
    VALUES (' || insert_values_var || ')
    RETURNING *';

END $$;


-- DO
-- $$
-- BEGIN
--     EXECUTE 'INSERT INTO ' || $1 || ' (' || array_to_string($2, ', ') || ') 
--     VALUES (' || array_to_string($3, ', ') || ') 
--     RETURNING *';
-- END;
-- $$ LANGUAGE plpgsql;