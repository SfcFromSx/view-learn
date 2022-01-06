package com.learn.view.bean;


import lombok.Data;

import java.io.Serializable;

@Data
public class EmployVo implements Serializable {
    String name;
    Integer value;
    public EmployVo(String name, Integer value) {
        this.name = name;
        this.value = value;
    }
}
