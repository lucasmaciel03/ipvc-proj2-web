CREATE TABLE tbl_consultas(
    id SERIAL PRIMARY KEY,
    utente_id INT,
    medico_id INT,
    data_hora DATE,
    status BOOLEAN,
    motivo VARCHAAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_utente FOREIGN KEY (utente_id) REFERENCES tbl_utentes(id),
    CONSTRAINT fk_medico FOREIGN KEY (medico_id) REFERENCES tbl_medicos(id)
)