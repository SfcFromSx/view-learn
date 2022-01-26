package com.learn.view.controller;

import com.learn.view.data.H2DataSource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
public class ConfigController {

    @ResponseBody
    @RequestMapping("/learn/view/config/option/{optionId}")
    public String getOptionConfigById(@PathVariable("optionId") String optionId) throws IOException {
        return H2DataSource.getOptionJson(optionId);
    }
}
