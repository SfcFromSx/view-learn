package com.learn.view.controller;

import com.learn.view.bean.DealDetail;
import com.learn.view.bean.EmployDetail;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Controller
public class WordCloudController {

    @RequestMapping("/learn/view/wordCloud/detail/{name}/{value}")
    public String index(Model model, @PathVariable("name") String name, @PathVariable("value") Integer value) {
        EmployDetail employee = new EmployDetail();
        employee.setName(name);
        employee.setDepartment(name + "department");
        while (value != 0) {
            List<DealDetail> dealDetails = employee.getDealDetails();
            dealDetails.add(new DealDetail(String.valueOf(value), new BigDecimal(value * 10), new Date()));
            value--;
        }
        model.addAttribute("employee", employee);
        return "word_cloud_detail";
    }
}