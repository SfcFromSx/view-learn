package com.learn.view.controller;

import com.learn.view.data.H2DataSource;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
public class ConfigController {

    @ResponseBody
    @RequestMapping("/learn/view/config/query/{configType}/{configId}")
    public String getOptionConfigById(
            @PathVariable("configType") String configType,
            @PathVariable("configId") String configId
    ) throws IOException {
        return H2DataSource.getConfigJson(configType, configId);
    }

    @ResponseBody
    @RequestMapping("/learn/view/config/save/{configType}/{configId}")
    public String saveOptionConfig(
            @PathVariable("configType") String configType,
            @PathVariable("configId") String configId,
            @RequestParam("message") String message
    ) throws IOException {
        H2DataSource.saveConfigJson(configType, configId, message);
        return "success";
    }
}
