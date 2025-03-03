CREATE TABLE tbl_user_roles(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES tbl_users(id),
    role_id INTEGER NOT NULL REFERENCES tbl_roles(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
