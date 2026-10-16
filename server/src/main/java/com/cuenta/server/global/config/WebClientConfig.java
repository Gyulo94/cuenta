package com.cuenta.server.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import com.cuenta.server.global.constants.Constants;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebClientConfig {

    private final Constants constants;

    @Bean
    @SuppressWarnings("null")
    public WebClient emailWebClient(WebClient.Builder builder) {
        return builder
                .baseUrl(constants.getEmailUrl())
                .build();
    }
}
