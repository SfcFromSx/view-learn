package com.learn.view.controller;

import com.learn.view.bean.vo.ChartVo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
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
    public List<List<ChartVo>> extractGauge() {
        List<List<ChartVo>> values = new ArrayList<>();
        List<ChartVo> value = new ArrayList<>();
        value.add(new ChartVo("",String.format("%.2f", new Random().nextDouble()*100.0), DEFAULT));
        values.add(value);
        return values;
    }

    @ResponseBody
    @RequestMapping("/learn/view/extract/liquidFill")
    public List<List<ChartVo>> extractLiquidFill() {
        List<List<ChartVo>> values = new ArrayList<>();
        List<ChartVo> value = new ArrayList<>();
        value.add(new ChartVo("",String.format("%.2f", new Random().nextDouble()), DEFAULT));
        value.add(new ChartVo("",String.format("%.2f", new Random().nextDouble()), DEFAULT));
        value.add(new ChartVo("",String.format("%.2f", new Random().nextDouble()), DEFAULT));
        values.add(value);
        return values;
    }

    @ResponseBody
    @RequestMapping("/learn/view/extract/map")
    public List<List<ChartVo>> extractMap() {
        List<List<ChartVo>> values = new ArrayList<>();
        List<ChartVo> value = new ArrayList<>();
        List<String> list = Arrays.asList("北京","天津","上海","重庆","河北","河南","云南","辽宁","黑龙江","湖南","安徽","山东",
                "新疆","江苏","浙江","江西","湖北","广西","甘肃","山西","内蒙古","陕西","吉林","福建","贵州","广东","青海","西藏",
                "四川","宁夏","海南","台湾","香港","澳门","南海诸岛");
        for(int i=0;i<list.size();i++){
            value.add(new ChartVo(list.get(i),String.valueOf(new Random().nextInt(2000)), DEFAULT));
        }
        values.add(value);
        return values;
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
