package com.learn.view.bean.vo;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class ChartVo implements Serializable {
    String name;
    String value;
    String type;
}
