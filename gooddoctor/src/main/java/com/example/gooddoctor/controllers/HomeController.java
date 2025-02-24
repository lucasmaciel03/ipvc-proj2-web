package com.example.gooddoctor;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("mensagem", "Se este texto aparecer, o Thymeleaf está funcionando!");
        return "index"; // O Thymeleaf buscará templates/index.html
    }
}
