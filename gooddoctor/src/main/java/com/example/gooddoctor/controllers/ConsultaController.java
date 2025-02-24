package com.example.gooddoctor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ConsultaController {

    @GetMapping("/consulta")
    public String consulta() {
        return "consulta"; // Renderiza templates/consulta.html
    }
}
