DO $$
    DECLARE set_values VARCHAR(5000);

    BEGIN
        SELECT string_agg(key || ' = ' ||
            CASE
                WHEN (EXISTS (SELECT pg_typeof(value) = 'character varying'::regtype)) THEN quote_literal(value)
                ELSE value
            END, ', ')
        INTO set_values
        FROM json_each_text($3);
        
        EXECUTE 'UPDATE ' || $2 ||
        ' SET ' || set_values ||
        ' WHERE ' || regexp_replace($2, 's(?!\\S)', '') || '_id = ' || $4 ||
        ' AND user_id = ' || $1;
    END;
$$;