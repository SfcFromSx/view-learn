package com.learn.view.bean;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class EmployDetail {
    String name;
    String department;
    List<DealDetail> dealDetails = new ArrayList<>();
}
