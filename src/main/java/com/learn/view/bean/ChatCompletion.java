package com.learn.view.bean;

import java.util.List;

public class ChatCompletion {
    private String id;
    private String object;
    private long created;
    private List<Choice> choices;
    private Usage usage;

    // Getter and setter methods

    public static class Choice {
        private int index;
        private Message message;
        private String finish_reason;

        // Getter and setter methods

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
        public Choice(int index, Message message, String finish_reason) {
            this.index = index;
            this.message = message;
            this.finish_reason = finish_reason;
        }
    }

    public static class Usage {
        private int prompt_tokens;
        private int completion_tokens;
        private int total_tokens;

        // Getter and setter methods
    }

    // Constructor
    public ChatCompletion(String id, String object, long created, List<Choice> choices, Usage usage) {
        this.id = id;
        this.object = object;
        this.created = created;
        this.choices = choices;
        this.usage = usage;
    }
}
