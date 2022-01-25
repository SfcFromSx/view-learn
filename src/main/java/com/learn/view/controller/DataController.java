package com.learn.view.controller;

import com.learn.view.bean.vo.ChartVo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class DataController {
    public static String DEFAULT = "default";

    @ResponseBody
    @RequestMapping("/learn/view/extract/wordCloud")
    public List<List<ChartVo>> extract() {
        List<ChartVo> value = new ArrayList<>();
        value.add(new ChartVo("张三", String.valueOf(new Random().nextInt(300)), DEFAULT));
        value.add(new ChartVo("李四", String.valueOf(new Random().nextInt(300)), DEFAULT));
        value.add(new ChartVo("王五", String.valueOf(new Random().nextInt(300)), DEFAULT));
        value.add(new ChartVo("赵六", String.valueOf(new Random().nextInt(300)), DEFAULT));
        value.add(new ChartVo("孙七", String.valueOf(new Random().nextInt(300)), DEFAULT));
        List<List<ChartVo>> values = new ArrayList<>();
        values.add(value);
        return values;
    }

    @ResponseBody
    @RequestMapping("/learn/view/extract/funnel")
    public List<List<ChartVo>> extractFunnel() {
        List<List<ChartVo>> values = new ArrayList<>();
        values.add(getRandomData("状态"));
        values.add(getRandomData("状态"));
        values.add(getRandomData("状态"));
        values.add(getRandomData("状态"));
        values.add(getRandomData("状态"));
        return values;
    }

    @ResponseBody
    @RequestMapping("/learn/view/extract/gauge")
    public List<ChartVo> extractGauge() {
        List<ChartVo> value = new ArrayList<>();
        value.add(new ChartVo("",String.format("%.2f", new Random().nextDouble()*100.0), DEFAULT));
        return value;
    }

    private List<ChartVo> getRandomData(String name) {
        List<ChartVo> value = new ArrayList<>();
        int i = 5;
        while (i > 0) {
            value.add(new ChartVo(name + i--, getRandomValue(), DEFAULT));
        }
        return value;
    }

    private String getRandomValue() {
       return String.valueOf(new Random().nextInt(300));
    }

}
