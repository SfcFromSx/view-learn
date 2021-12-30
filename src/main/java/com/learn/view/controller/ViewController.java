package com.learn.view.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping("/learn/view/index")
    public String index(Model model) {
        model.addAttribute("title", "一体化管控平台");
        return "index";
    }
}
