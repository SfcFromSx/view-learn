package com.learn.view.bean.para;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ViewPara {
    String title;
    Map<String, String> charts;
    List<ChartPara> chartParas;
    String jsonPara;
}
