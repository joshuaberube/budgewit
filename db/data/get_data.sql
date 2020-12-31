CREATE OR REPLACE FUNCTION get_data(user_id INT, table_name anyelement)
RETURNS SETOF ANYELEMENT AS $$
    BEGIN
        RETURN QUERY EXECUTE 
            format('SELECT * FROM %s WHERE user_id = $1', pg_typeof(table_name)) USING user_id;
    END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_data($1, NULL::$2);

-- $1 is 5 and $2 is 'goals' for example