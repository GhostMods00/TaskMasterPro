-- Clear existing data
TRUNCATE users, projects, project_members, tasks, time_logs, comments, attachments CASCADE;

-- Reset sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE projects_id_seq RESTART WITH 1;
ALTER SEQUENCE tasks_id_seq RESTART WITH 1;
ALTER SEQUENCE time_logs_id_seq RESTART WITH 1;
ALTER SEQUENCE comments_id_seq RESTART WITH 1;
ALTER SEQUENCE attachments_id_seq RESTART WITH 1;

-- Sample Users
INSERT INTO users (username, email, password, first_name, last_name, role) VALUES
('john_admin', 'john@example.com', '$2a$10$xVQZyx5Rza2Jk8CWgIoTF.kThBp9h4UqFgvKSv3NBxHRyEP9bhiV2', 'John', 'Doe', 'admin'),
('jane_pm', 'jane@example.com', '$2a$10$xVQZyx5Rza2Jk8CWgIoTF.kThBp9h4UqFgvKSv3NBxHRyEP9bhiV2', 'Jane', 'Smith', 'project_manager'),
('bob_dev', 'bob@example.com', '$2a$10$xVQZyx5Rza2Jk8CWgIoTF.kThBp9h4UqFgvKSv3NBxHRyEP9bhiV2', 'Bob', 'Wilson', 'user'),
('alice_dev', 'alice@example.com', '$2a$10$xVQZyx5Rza2Jk8CWgIoTF.kThBp9h4UqFgvKSv3NBxHRyEP9bhiV2', 'Alice', 'Brown', 'user');
-- Note: All passwords are 'password123' hashed with bcrypt

-- Sample Projects
INSERT INTO projects (title, description, status, start_date, due_date, owner_id) VALUES
('Website Redesign', 'Modernize company website with new design and features', 'active', '2024-01-01', '2024-03-31', 1),
('Mobile App Development', 'Develop cross-platform mobile application', 'active', '2024-02-01', '2024-06-30', 2),
('Database Migration', 'Migrate legacy database to new cloud infrastructure', 'planning', '2024-03-01', '2024-04-30', 2);

-- Sample Project Members
INSERT INTO project_members (project_id, user_id, role) VALUES
(1, 1, 'owner'),
(1, 2, 'member'),
(1, 3, 'member'),
(2, 2, 'owner'),
(2, 3, 'member'),
(2, 4, 'member'),
(3, 2, 'owner'),
(3, 4, 'member');

-- Sample Tasks
INSERT INTO tasks (title, description, status, priority, project_id, assignee_id, created_by, start_date, due_date, estimated_hours) VALUES
-- Website Redesign Tasks
('Homepage Design', 'Create new homepage design mockup', 'in_progress', 'high', 1, 3, 1, '2024-01-05', '2024-01-20', 20.0),
('User Authentication', 'Implement secure login system', 'todo', 'high', 1, 3, 1, '2024-01-21', '2024-02-05', 15.0),
('Content Migration', 'Transfer content to new design', 'todo', 'medium', 1, 2, 1, '2024-02-06', '2024-02-20', 10.0),

-- Mobile App Tasks
('App Wireframes', 'Create application wireframes', 'completed', 'high', 2, 4, 2, '2024-02-01', '2024-02-15', 25.0),
('User Interface Development', 'Develop UI components', 'in_progress', 'high', 2, 3, 2, '2024-02-16', '2024-03-15', 40.0),
('API Integration', 'Integrate backend APIs', 'todo', 'medium', 2, 4, 2, '2024-03-16', '2024-04-15', 30.0),

-- Database Migration Tasks
('Data Analysis', 'Analyze current database structure', 'todo', 'high', 3, 4, 2, '2024-03-01', '2024-03-15', 20.0),
('Migration Script', 'Develop migration scripts', 'todo', 'high', 3, 4, 2, '2024-03-16', '2024-03-31', 25.0);

-- Sample Time Logs
INSERT INTO time_logs (task_id, user_id, hours_logged, description, date_logged) VALUES
(1, 3, 6.5, 'Initial homepage mockup design', '2024-01-05'),
(1, 3, 7.0, 'Revisions and refinements', '2024-01-06'),
(4, 4, 8.0, 'Completed wireframe designs', '2024-02-01'),
(5, 3, 6.0, 'Started UI component development', '2024-02-16');

-- Sample Comments
INSERT INTO comments (content, task_id, user_id) VALUES
('Initial mockup looks great! Few minor adjustments needed in the header section.', 1, 1),
('Thanks for the feedback. Will update the header design.', 1, 3),
('Wireframes approved by the client. Ready to proceed with development.', 4, 2),
('Started working on the responsive components.', 5, 3);

-- Sample Attachments
INSERT INTO attachments (file_name, file_path, file_type, file_size, task_id, uploaded_by) VALUES
('homepage-mockup-v1.png', '/uploads/homepage-mockup-v1.png', 'image/png', 2048, 1, 3),
('app-wireframes.pdf', '/uploads/app-wireframes.pdf', 'application/pdf', 3072, 4, 4),
('ui-components.sketch', '/uploads/ui-components.sketch', 'application/sketch', 4096, 5, 3);
