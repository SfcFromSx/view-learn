package com.learn.view.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.learn.view.bean.ChatRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
public class ChatController {

    @Value("${openai.apiKey}")
    private String apiKey;

    @Qualifier("chatRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.url}")
    private String url;

    @RequestMapping("/chat")
    public String chatView(Model model) {
        model.addAttribute("title", "业务管控平台-主屏1号");
        return "index";
    }

    @RequestMapping("/chat/ask")
    @ResponseBody
    public String ask(@RequestBody ChatRequest chatRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        String jsonStr = JSON.toJSONString(chatRequest, SerializerFeature.PrettyFormat);
        System.out.println(jsonStr);
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonStr, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange("https://api.openai.com/v1/chat/completions", HttpMethod.POST, requestEntity, String.class);
        return responseEntity.getBody();
    }
}
