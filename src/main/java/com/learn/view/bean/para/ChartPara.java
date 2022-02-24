package com.learn.view.bean.para;

import lombok.Data;

@Data
public class ChartPara {
    String location;
    String chartTitle;
    String chartType;
    String dataUrl;
    Integer frequency;
    String optionJson;
    String border;
}
