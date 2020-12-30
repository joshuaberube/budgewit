DO $$
    DECLARE
        key_values VARCHAR(500);
        insert_values_var VARCHAR(1500);

    BEGIN
        SELECT
            string_agg(key, ', ') keys,
            string_agg(
                CASE
                    WHEN (EXISTS (SELECT pg_typeof(value) = 'character varying'::regtype)) THEN quote_literal(value)
                    ELSE value
                END, ', ') insert_values
        INTO key_values, insert_values_var
        FROM json_each_text($3);

        EXECUTE 'INSERT INTO ' || $2 || ' (' || regexp_replace(key_values, '"', '') || ', user_id)
        VALUES (' || insert_values_var || ', ' || $1 || ')
        RETURNING *';
    END;
$$;