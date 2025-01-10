-- Create Users Table
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role VARCHAR(20) NOT NULL,
    "mustChangePassword" BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Projects Table
CREATE TABLE "Projects" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'planning',
    "startDate" TIMESTAMP,
    "endDate" TIMESTAMP,
    owner_id INT REFERENCES "Users"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Project Members Table
CREATE TABLE "ProjectMembers" (
    "projectId" INT REFERENCES "Projects"(id) ON DELETE CASCADE,
    "userId" INT REFERENCES "Users"(id) ON DELETE CASCADE,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("projectId", "userId")
);

-- Create Tasks Table
CREATE TABLE "Tasks" (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'todo',
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    "projectId" INT REFERENCES "Projects"(id) ON DELETE CASCADE,
    "assigneeId" INT REFERENCES "Users"(id) ON DELETE SET NULL,
    "createdBy" INT REFERENCES "Users"(id) ON DELETE SET NULL,
    "dueDate" TIMESTAMP,
    estimated_hours NUMERIC(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Time Logs Table
CREATE TABLE "TimeLogs" (
    id SERIAL PRIMARY KEY,
    "taskId" INT REFERENCES "Tasks"(id) ON DELETE CASCADE,
    "userId" INT REFERENCES "Users"(id) ON DELETE CASCADE,
    hours_logged NUMERIC(5,2) NOT NULL,
    description TEXT,
    date_logged DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Comments Table
CREATE TABLE "Comments" (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    "taskId" INT REFERENCES "Tasks"(id) ON DELETE CASCADE,
    "userId" INT REFERENCES "Users"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Attachments Table
CREATE TABLE "Attachments" (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(255),
    file_size INT,
    "taskId" INT REFERENCES "Tasks"(id) ON DELETE CASCADE,
    "uploadedBy" INT REFERENCES "Users"(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
