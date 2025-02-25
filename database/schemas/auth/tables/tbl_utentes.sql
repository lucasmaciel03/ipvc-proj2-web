CREATE TABLE tbl_utentes (
    id SERIAL PRIMARY KEY,
    utilizador_id INT,
    data_nascimento DATE,
    morada VARCHAR(255),
    idade INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_utilizador FOREIGN KEY (utilizador_id) REFERENCES tbl_users(id)
)