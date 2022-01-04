package com.learn.view;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ViewApplication {

	public static void main(String[] args) {
		SpringApplication.run(ViewApplication.class, args);
	}

}
