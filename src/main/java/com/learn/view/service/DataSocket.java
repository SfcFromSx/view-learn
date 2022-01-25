package com.learn.view.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learn.view.bean.vo.ChartVo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArraySet;

import static com.learn.view.controller.DataController.DEFAULT;

@Component
@ServerEndpoint("/webSocket")
public class DataSocket {
    private Session session;

    private static CopyOnWriteArraySet<DataSocket> socketSet = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        socketSet.add(this);
        System.out.println("new connection.size:" + socketSet.size());
    }

    @OnClose
    public void onClose() {
        socketSet.remove(this);
        System.out.println("remove connection.size:" + socketSet.size());
    }
    @OnMessage
    public void onMessage(String message) {
        System.out.println("receive:" + message);
    }

    @Scheduled(fixedRate = 2000)
    public void sendMessage() {
        for (DataSocket socket : socketSet) {
            try {
                List<ChartVo> value = new ArrayList<>();
                value.add(new ChartVo("张三2", String.valueOf(new Random().nextInt(300)), DEFAULT));
                value.add(new ChartVo("李四2", String.valueOf(new Random().nextInt(300)), DEFAULT));
                value.add(new ChartVo("王五2", String.valueOf(new Random().nextInt(300)), DEFAULT));
                value.add(new ChartVo("赵六2", String.valueOf(new Random().nextInt(300)), DEFAULT));
                value.add(new ChartVo("孙七2", String.valueOf(new Random().nextInt(300)), DEFAULT));
                List<List<ChartVo>> values = new ArrayList<>();
                values.add(value);
                ObjectMapper objectMapper = new ObjectMapper();
                String json = objectMapper.writeValueAsString(values);
                socket.session.getBasicRemote().sendText(json);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
