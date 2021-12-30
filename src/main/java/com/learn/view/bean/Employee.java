package com.learn.view.bean;


import java.io.Serializable;

public class Employee implements Serializable {
    String name;
    Integer value;
    public Employee(String name, Integer value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public Integer getValue() {
        return value;
    }
}
