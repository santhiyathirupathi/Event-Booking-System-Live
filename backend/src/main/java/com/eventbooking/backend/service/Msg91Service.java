package com.eventbooking.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class Msg91Service {

    private final RestClient restClient;

    @Value("${msg91.authkey}")
    private String authKey;

    @Value("${msg91.template-id}")
    private String templateId;

    public Msg91Service() {
        this.restClient = RestClient.builder()
                .baseUrl("https://control.msg91.com")
                .build();
    }

    public String sendOtp(String phone) {

        if (authKey == null || authKey.isBlank()) {
            throw new RuntimeException(
                    "MSG91_AUTHKEY is not configured"
            );
        }

        if (templateId == null || templateId.isBlank()) {
            throw new RuntimeException(
                    "MSG91_TEMPLATE_ID is not configured"
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

    public String verifyOtp(String phone, String otp) {

        if (authKey == null || authKey.isBlank()) {
            throw new RuntimeException(
                    "MSG91_AUTHKEY is not configured"
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