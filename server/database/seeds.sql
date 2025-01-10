-- Clear existing data
TRUNCATE TABLE "Attachments", "Comments", "TimeLogs", "Tasks", "ProjectMembers", "Projects", "Users" RESTART IDENTITY CASCADE;

-- Insert Users
INSERT INTO "Users" (id, username, email, password, first_name, last_name, role, "mustChangePassword") VALUES
(1, 'john_admin', 'john@example.com', '$2b$10$zHIMVdzaEVxdoQenmZCYw.ljJ1j4tUBUL.o4TgA.TG/W/SMz6jNMm', 'John', 'Doe', 'admin', FALSE),
(2, 'jane_pm', 'jane@example.com', '$2b$10$zji/7C7c1qfZppRHs5a3g.3DCFzWDYcdOAqSKrq.ne7L923DCqm2u', 'Jane', 'Smith', 'project_manager', FALSE),
(3, 'bob_dev', 'bob@example.com', '$2b$10$zji/7C7c1qfZppRHs5a3g.3DCFzWDYcdOAqSKrq.ne7L923DCqm2u', 'Bob', 'Wilson', 'user', FALSE),
(4, 'alice_dev', 'alice@example.com', '$2b$10$zji/7C7c1qfZppRHs5a3g.3DCFzWDYcdOAqSKrq.ne7L923DCqm2u', 'Alice', 'Brown', 'user', FALSE);

-- Insert Projects
INSERT INTO "Projects" (id, title, description, status, "startDate", "endDate", owner_id) VALUES
(1, 'Backend Overhaul', 'Revamp backend architecture.', 'active', '2025-01-01', '2025-06-01', 1),
(2, 'Frontend Revamp', 'Upgrade frontend to modern UI.', 'planning', '2025-01-15', '2025-04-15', 2);

-- Insert Project Members
INSERT INTO "ProjectMembers" ("projectId", "userId", role, created_at, updated_at) VALUES
(1, 1, 'owner', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'member', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'owner', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'member', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Tasks
INSERT INTO "Tasks" (id, title, description, status, priority, "projectId", "assigneeId", "createdBy", "dueDate", estimated_hours, created_at, updated_at) VALUES
(1, 'Build API Endpoints', 'Develop secure and scalable APIs.', 'in_progress', 'high', 1, 3, 1, '2025-02-01', 40.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'UI Redesign', 'Design new UI components.', 'todo', 'medium', 2, 4, 2, '2025-03-01', 20.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Time Logs
INSERT INTO "TimeLogs" (id, "taskId", "userId", hours_logged, description, date_logged, created_at, updated_at) VALUES
(1, 1, 3, 5.0, 'Setup API structure', '2025-02-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 3, 4.5, 'Implemented authentication', '2025-02-02', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Comments
INSERT INTO "Comments" (id, content, "taskId", "userId", created_at, updated_at) VALUES
(1, 'Great progress on the API.', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'UI design needs some tweaks.', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Attachments
INSERT INTO "Attachments" (id, file_name, file_path, file_type, file_size, "taskId", "uploadedBy", created_at, updated_at) VALUES
(1, 'api-design.docx', '/uploads/api-design.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 5120, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'ui-mockup.png', '/uploads/ui-mockup.png', 'image/png', 2048, 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
