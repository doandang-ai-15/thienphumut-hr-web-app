-- Seed Database Script for Neon
-- Copy và paste toàn bộ script này vào Neon SQL Editor

-- Clear existing data (nếu có)
DELETE FROM contracts;
DELETE FROM leave_applications;
DELETE FROM employees;
DELETE FROM departments;

-- Reset sequences
ALTER SEQUENCE IF EXISTS departments_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS employees_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS leave_applications_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS contracts_id_seq RESTART WITH 1;

-- Seed Departments
INSERT INTO departments (name, description, manager_id, employee_count, budget, color, location, created_at, updated_at) VALUES
('Engineering', 'Software Development and Engineering', 1, 5, 500000, '#3B82F6', 'Hồ Chí Minh', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Human Resources', 'HR Management and Recruitment', 2, 3, 150000, '#F875AA', 'Hồ Chí Minh', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Marketing', 'Marketing and Brand Management', NULL, 2, 200000, '#AEDEFC', 'Hà Nội', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sales', 'Sales and Business Development', NULL, 3, 300000, '#10B981', 'Hồ Chí Minh', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Finance', 'Financial Planning and Accounting', NULL, 2, 250000, '#F59E0B', 'Hà Nội', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Employees (password: password123 - đã hash bằng bcrypt)
-- Password hash: $2a$10$YourHashHere (cần generate từ bcrypt)
INSERT INTO employees (
    employee_id, first_name, last_name, email, password, phone,
    date_of_birth, gender, job_title, department_id, reports_to,
    employment_type, start_date, salary, pay_frequency,
    address, city, state, zip_code, country, status, performance_score, role,
    created_at, updated_at
) VALUES
-- Admin User (password: password123)
('EMP-001', 'Nguyễn', 'Văn An', 'admin@thienphumut.vn', '$2a$10$FCFFMS1Ka84yxMIXlU2MZeR078OMhqqlRHP5nhCDa5hLIAeOiyRn.', '0123456789',
 '1985-05-15', 'male', 'CEO & Founder', 1, NULL, 'full-time', '2019-01-01', 150000, 'monthly',
 '123 Đường ABC', 'Hồ Chí Minh', 'Hồ Chí Minh', '700000', 'Vietnam', 'active', 95, 'admin',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- HR Manager (password: password123)
('EMP-002', 'Trần', 'Thị Bình', 'hr@thienphumut.vn', '$2a$10$FCFFMS1Ka84yxMIXlU2MZeR078OMhqqlRHP5nhCDa5hLIAeOiyRn.', '0987654321',
 '1990-08-20', 'female', 'HR Manager', 2, 1, 'full-time', '2019-03-01', 80000, 'monthly',
 '456 Đường XYZ', 'Hồ Chí Minh', 'Hồ Chí Minh', '700000', 'Vietnam', 'active', 88, 'manager',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Employee (password: password123)
('EMP-003', 'Lê', 'Văn Công', 'engineer@thienphumut.vn', '$2a$10$FCFFMS1Ka84yxMIXlU2MZeR078OMhqqlRHP5nhCDa5hLIAeOiyRn.', '0912345678',
 '1992-03-10', 'male', 'Senior Engineer', 1, 1, 'full-time', '2020-06-15', 70000, 'monthly',
 '789 Đường DEF', 'Hồ Chí Minh', 'Hồ Chí Minh', '700000', 'Vietnam', 'active', 92, 'employee',
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Leave Applications
INSERT INTO leave_applications (employee_id, leave_type, start_date, end_date, days, reason, status, approved_by, approved_at, created_at, updated_at) VALUES
(2, 'Du lịch', CURRENT_DATE + INTERVAL '30 days', CURRENT_DATE + INTERVAL '37 days', 7, 'Nghỉ cuối năm', 'chờ xét duyệt', NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Bệnh', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE - INTERVAL '4 days', 2, 'Khám bệnh', 'duyệt', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Seed Contracts
INSERT INTO contracts (employee_id, contract_type, contract_number, start_date, end_date, salary, terms, status, signed_at, created_at, updated_at) VALUES
(1, 'vĩnh viễn', 'CNT-2019-001', '2019-01-01', NULL, 150000, 'Hợp đồng vĩnh viễn CEO', 'còn thời hạn', '2019-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'vĩnh viễn', 'CNT-2019-002', '2019-03-01', NULL, 80000, 'Hợp đồng vĩnh viễn HR Manager', 'còn thời hạn', '2019-03-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'vĩnh viễn', 'CNT-2020-003', '2020-06-15', NULL, 70000, 'Hợp đồng vĩnh viễn Senior Engineer', 'còn thời hạn', '2020-06-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Verify data
SELECT 'Departments:' as table_name, COUNT(*) as count FROM departments
UNION ALL
SELECT 'Employees:', COUNT(*) FROM employees
UNION ALL
SELECT 'Leave Applications:', COUNT(*) FROM leave_applications
UNION ALL
SELECT 'Contracts:', COUNT(*) FROM contracts;

-- Show employee credentials for testing
SELECT
    email,
    role,
    'password123' as password_plaintext,
    CASE
        WHEN email = 'admin@thienphumut.vn' THEN 'Full admin access'
        WHEN email = 'hr@thienphumut.vn' THEN 'HR Manager access'
        WHEN email = 'engineer@thienphumut.vn' THEN 'Employee access'
    END as access_level
FROM employees
ORDER BY role DESC;
