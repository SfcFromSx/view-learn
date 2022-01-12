package com.learn.view.controller;

import com.learn.view.bean.vo.FunnelVO;
import com.learn.view.bean.vo.WordCloudVo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class DataController {

    @ResponseBody
    @RequestMapping("/learn/view/extract/wordCloud")
    public List<WordCloudVo> extract() {
        List<WordCloudVo> value = new ArrayList<>();
        value.add(new WordCloudVo("张三", new Random().nextInt(300)));
        value.add(new WordCloudVo("李四", new Random().nextInt(300)));
        value.add(new WordCloudVo("王五", new Random().nextInt(300)));
        value.add(new WordCloudVo("赵六", new Random().nextInt(300)));
        value.add(new WordCloudVo("孙七", new Random().nextInt(300)));
        return value;
    }

    @ResponseBody
    @RequestMapping("/learn/view/extract/funnel")
    public List<FunnelVO> extractFunnel() {
        List<FunnelVO> value = new ArrayList<>();
        value.add(new FunnelVO("状态1", new Random().nextInt(300)));
        value.add(new FunnelVO("状态2", new Random().nextInt(300)));
        value.add(new FunnelVO("状态3", new Random().nextInt(300)));
        value.add(new FunnelVO("状态4", new Random().nextInt(300)));
        value.add(new FunnelVO("状态5", new Random().nextInt(300)));
        return value;
    }

}
