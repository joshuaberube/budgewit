CREATE OR REPLACE FUNCTION get_data(user_id INT, table_name anyelement)
RETURNS SETOF ANYELEMENT AS $$
    BEGIN
        RETURN QUERY EXECUTE 
            format('SELECT * FROM %I WHERE user_id = $1', table_name) USING user_id;
    END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_data($1, NULL::"goals");

-- $1 is 5 and $2 is 'goals' for example