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


    @RequestMapping("/learn/view/matts")
    public String branch1(Model model) {
        model.addAttribute("title", "田字格分屏");
        return "view_matts";
    }

    @RequestMapping("/learn/view/soduku")
    public String branch2(Model model) {
        model.addAttribute("title", "九宫格分屏");
        return "view_matts";
    }
}
