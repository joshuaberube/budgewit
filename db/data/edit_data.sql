--NOT FINISHED
--TRY PULLING FOR LOOP OUTSIDE OF THE SET, setting it to a 
-- variable as a string separated by commas 
-- (except the last one) then put that variable in place

DO $$
BEGIN
    EXECUTE 'UPDATE ' || $2 ||
    ' SET 
        FOR item IN SELECT key, value FROM json_each_text('|| $3 ||')
        LOOP
            '|| item.key || ' = ' || item.value ||',
        END LOOP'
    ' WHERE ' || regexp_replace($2, 's(?!\\S)', '') || '_id = ' || $4 ||
    ' AND user_id = ' || $1;
END $$;