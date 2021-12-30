package com.learn.view.controller;

import com.learn.view.bean.Employee;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class DataController {

    @ResponseBody
    @RequestMapping("/learn/view/extract")
    public List<Employee> extract() {
        List<Employee> value = new ArrayList<>();
        value.add(new Employee("张三", new Random().nextInt(300)));
        value.add(new Employee("李四", new Random().nextInt(300)));
        value.add(new Employee("王五", new Random().nextInt(300)));
        value.add(new Employee("赵六", new Random().nextInt(300)));
        value.add(new Employee("孙七", new Random().nextInt(300)));
        return value;
    }

}
