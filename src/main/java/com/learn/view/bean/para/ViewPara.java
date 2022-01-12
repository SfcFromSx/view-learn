package com.learn.view.bean.para;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ViewPara {
    String title;
    List<ChartPara> chartParas = new ArrayList<>();
    String jsonPara;
}
