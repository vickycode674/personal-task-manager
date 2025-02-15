-- Step 1: Add a new temporary column as TEXT
ALTER TABLE tasks ADD COLUMN priority_temp TEXT;

-- Step 2: Convert old priority values (integer to text)
UPDATE tasks 
SET priority_temp = 
  CASE 
    WHEN priority = 1 THEN 'Low'
    WHEN priority = 2 THEN 'Medium'
    WHEN priority = 3 THEN 'High'
    ELSE 'Low'  -- Default to 'Low' if NULL or other values
  END;

-- Step 3: Drop the old column
ALTER TABLE tasks DROP COLUMN priority;

-- Step 4: Rename the temporary column to `priority`
ALTER TABLE tasks RENAME COLUMN priority_temp TO priority;
