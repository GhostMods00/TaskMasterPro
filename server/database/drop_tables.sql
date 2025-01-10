DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Verify that tables are dropped
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
