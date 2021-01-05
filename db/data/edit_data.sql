DO $$
    DECLARE set_values VARCHAR(5000);

    BEGIN
        SELECT string_agg(key || ' = ' ||
            CASE
                WHEN (EXISTS (SELECT pg_typeof(value) = 'character varying'::regtype))
                THEN quote_literal(value)
                ELSE value
            END, ', ')
        INTO set_values
        FROM json_each_text($3);
        
        EXECUTE format('UPDATE %I SET %s WHERE %s = %L AND user_id = %L', 
            $2, set_values, regexp_replace($2, 's$', '_id'), $4, $1);
    END;
$$;