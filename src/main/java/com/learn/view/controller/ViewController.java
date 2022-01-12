package com.learn.view.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learn.view.bean.para.ChartPara;
import com.learn.view.bean.para.ViewPara;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class ViewController {

    @RequestMapping("/learn/view/index")
    public String index(Model model) {
        model.addAttribute("title", "一体化管控平台");
        return "index";
    }


    @RequestMapping("/learn/view/2p2")
    public String branch1(Model model) throws JsonProcessingException {
        ViewPara viewPara = new ViewPara();
        List<ChartPara> chartParas = viewPara.getChartParas();
        viewPara.setTitle("田字格分屏");
        // 左1图标配置 以词云为例
        ChartPara left1 = new ChartPara();
        left1.setLocation("left1");
        left1.setChartType("wordCloud");
        left1.setChartTitle("左1图表展示");
        left1.setDataUrl("http://localhost:8080/learn/view/extract/wordCloud");
        left1.setFrequency(5000);
        chartParas.add(left1);
        // 左2图标配置 以漏斗图为例
        ChartPara left2 = new ChartPara();
        left2.setLocation("left2");
        left2.setChartType("funnel");
        left2.setChartTitle("左2图表展示");
        left2.setDataUrl("http://localhost:8080/learn/view/extract/funnel");
        left2.setFrequency(2000);
        chartParas.add(left2);
        // 右1 右2

        viewPara.setJsonPara("[" + new ObjectMapper().writeValueAsString(viewPara) + "]");
        model.addAttribute("para", viewPara);
        return "view_2p2";
    }

    @RequestMapping("/learn/view/3p3")
    public String branch2(Model model) {
        model.addAttribute("para", "九宫格分屏");
        return "view_3p3";
    }
}
