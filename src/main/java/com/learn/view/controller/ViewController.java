package com.learn.view.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learn.view.bean.para.ChartPara;
import com.learn.view.bean.para.ViewPara;
import com.learn.view.data.H2DataSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class ViewController {

    @RequestMapping("/learn/view/main2/{templateId}")
    public String index(Model model, @PathVariable("templateId") String templateId) throws Exception {
        ViewPara viewPara = getTemplateParaById(templateId);
        model.addAttribute("para", viewPara);
        return "view_main2";
    }

    @RequestMapping("/learn/view/main1")
    public String main(Model model) {
        model.addAttribute("title", "业务管控平台-主屏1号");
        return "index";
    }


    @RequestMapping("/learn/view/2p2/{templateId}")
    public String viewModelOf2p2(Model model,  @PathVariable("templateId") String templateId) throws Exception {
        ViewPara viewPara = getTemplateParaById(templateId);
        model.addAttribute("para", viewPara);
        return "view_2p2";
    }

    @RequestMapping("/learn/view/2p3/{templateId}")
    public String viewModelOf2p3(Model model, @PathVariable("templateId") String templateId) throws Exception {
        ViewPara viewPara = getTemplateParaById(templateId);
        model.addAttribute("para", viewPara);
        return "view_2p3";
    }

    private ViewPara getTemplateParaById(String templateId) throws Exception {
        String value = H2DataSource.queryParaByKey(templateId);
        ViewPara viewPara1 = new ObjectMapper().readValue(value, ViewPara.class);
        List<ChartPara> chartParas = new ArrayList<>();
        for (Map.Entry<String, String> entryMap : viewPara1.getCharts().entrySet()) {
            ChartPara chartPara = getChartParaById(entryMap.getValue());
            chartPara.setLocation(entryMap.getKey());
            chartParas.add(chartPara);
        }
        viewPara1.setChartParas(chartParas);
        viewPara1.setJsonPara("[" + new ObjectMapper().writeValueAsString(viewPara1) + "]");
        return viewPara1;
    }

    private ChartPara getChartParaById(String chartId) throws Exception {
        String value = H2DataSource.queryParaByKey(chartId);
        return new ObjectMapper().readValue(value, ChartPara.class);
    }
}
