package com.eventbooking.backend.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class Msg91Service {

    private final RestClient restClient;

    public Msg91Service() {
        this.restClient = RestClient.builder()
                .baseUrl("https://control.msg91.com")
                .build();
    }

    public String sendOtp(String phone) {

        String authKey = System.getenv("MSG91_AUTHKEY");
        String templateId = System.getenv("MSG91_TEMPLATE_ID");

        if (authKey == null || authKey.isBlank()) {
            throw new RuntimeException(
                    "MSG91_AUTHKEY environment variable is not configured"
            );
        }

        if (templateId == null || templateId.isBlank()) {
            throw new RuntimeException(
                    "MSG91_TEMPLATE_ID environment variable is not configured"
            );
        }

        String response = restClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/v5/otp")
                        .queryParam("template_id", templateId)
                        .queryParam("mobile", "91" + phone)
                        .queryParam("authkey", authKey)
                        .build())
                .header(
                        HttpHeaders.CONTENT_TYPE,
                        MediaType.APPLICATION_JSON_VALUE
                )
                .body("{}")
                .retrieve()
                .body(String.class);

        return response;
    }

    public String verifyOtp(
            String phone,
            String otp
    ) {

        String authKey = System.getenv("MSG91_AUTHKEY");

        if (authKey == null || authKey.isBlank()) {
            throw new RuntimeException(
                    "MSG91_AUTHKEY environment variable is not configured"
            );
        }

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/v5/otp/verify")
                        .queryParam("otp", otp)
                        .queryParam("mobile", "91" + phone)
                        .build())
                .header("authkey", authKey)
                .retrieve()
                .body(String.class);
    }
}