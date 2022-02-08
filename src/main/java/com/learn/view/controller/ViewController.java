package com.learn.view.controller;

import com.learn.view.bean.para.ViewPara;
import com.learn.view.data.H2DataSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping("/learn/view/main1")
    public String main1(Model model) {
        model.addAttribute("title", "业务管控平台-主屏1号");
        return "index";
    }

    @RequestMapping("/learn/view/main2/{templateId}")
    public String main2(Model model, @PathVariable("templateId") String templateId) throws Exception {
        ViewPara viewPara = H2DataSource.getTemplateParaById(templateId);
        model.addAttribute("para", viewPara);
        return "view_main2";
    }

    @RequestMapping("/learn/view/main3/{templateId}")
    public String main3(Model model, @PathVariable("templateId") String templateId) throws Exception {
        ViewPara viewPara = H2DataSource.getTemplateParaById(templateId);
        model.addAttribute("para", viewPara);
        return "view_main3";
    }


    @RequestMapping("/learn/view/2p2/{templateId}")
    public String viewModelOf2p2(Model model,  @PathVariable("templateId") String templateId) throws Exception {
        ViewPara viewPara = H2DataSource.getTemplateParaById(templateId);
        model.addAttribute("para", viewPara);
        return "view_2p2";
    }

    @RequestMapping("/learn/view/2p3/{templateId}")
    public String viewModelOf2p3(Model model, @PathVariable("templateId") String templateId) throws Exception {
        ViewPara viewPara = H2DataSource.getTemplateParaById(templateId);
        model.addAttribute("para", viewPara);
        return "view_2p3";
    }

    @RequestMapping("/learn/view/chartDiy")
    public String viewModelOf2p3(Model model) throws Exception {
        return "chart_diy";
    }

    @RequestMapping("/learn/view/json")
    public String jsonEdict(Model model) throws Exception {
        return "json_editor";
    }

    @RequestMapping("/learn/view/react")
    public String reactPractice(Model model) throws Exception {
        return "react_practice";
    }

}
