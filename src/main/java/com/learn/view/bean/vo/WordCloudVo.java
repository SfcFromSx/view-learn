package com.learn.view.bean.vo;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class WordCloudVo implements Serializable {
    String name;
    Integer value;
}
