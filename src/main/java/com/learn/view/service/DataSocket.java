package com.learn.view.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learn.view.bean.Employee;
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
                List<Employee> value = new ArrayList<>();
                value.add(new Employee("张三2", new Random().nextInt(300)));
                value.add(new Employee("李四2", new Random().nextInt(300)));
                value.add(new Employee("王五2", new Random().nextInt(300)));
                value.add(new Employee("赵六2", new Random().nextInt(300)));
                value.add(new Employee("孙七2", new Random().nextInt(300)));
                ObjectMapper objectMapper = new ObjectMapper();
                String json = objectMapper.writeValueAsString(value);
                socket.session.getBasicRemote().sendText(json);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
