-- 如果表已存在，先删除
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

-- 创建用户表
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    notification_enabled BOOLEAN DEFAULT true
);

-- 创建任务表
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    assigned_to BIGINT REFERENCES users(id),
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP NOT NULL,
    due_date TIMESTAMP
); 