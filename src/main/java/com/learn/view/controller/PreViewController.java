package com.learn.view.controller;

import com.learn.view.bean.para.ViewPara;
import com.learn.view.data.H2DataSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PreViewController {

    @RequestMapping("/learn/view/preview/main2/{templateValue}")
    public String main2(Model model, @PathVariable("templateValue") String templateValue) throws Exception {
        ViewPara viewPara = H2DataSource.getTemplateParaById(templateValue);
        model.addAttribute("para", viewPara);
        return "view_main2";
    }

    @RequestMapping("/learn/view/preview/main3/{templateValue}")
    public String main3(Model model, @PathVariable("templateValue") String templateValue) throws Exception {
        ViewPara viewPara = H2DataSource.getTemplateParaByValue(templateValue);
        model.addAttribute("para", viewPara);
        return "view_main3";
    }


    @RequestMapping("/learn/view/preview/2p2/{templateValue}")
    public String viewModelOf2p2(Model model,  @PathVariable("templateValue") String templateValue) throws Exception {
        ViewPara viewPara = H2DataSource.getTemplateParaByValue(templateValue);
        model.addAttribute("para", viewPara);
        return "view_2p2";
    }

    @RequestMapping("/learn/view/preview/2p3/{templateValue}")
    public String viewModelOf2p3(Model model, @PathVariable("templateValue") String templateValue) throws Exception {
        ViewPara viewPara = H2DataSource.getTemplateParaByValue(templateValue);
        model.addAttribute("para", viewPara);
        return "view_2p3";
    }

}
