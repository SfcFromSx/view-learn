package com.learn.view.bean;

import lombok.Data;

import java.util.List;

@Data
public class ChatRequest {
    private String model;
    private List<Message> messages;

    // Getter and setter methods

    @Data
    public static class Message {
        private String role;
        private String content;

        // Getter and setter methods

        // Constructor
        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }
    }

    // Constructor
    public ChatRequest(String model, List<Message> messages) {
        this.model = model;
        this.messages = messages;
    }
}
