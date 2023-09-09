package com.server.backend.services;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

@Service
public class MomoService {

    @Value("${momo.gateway.create}")
    private String urlCreate;

    @Value("${momo.gateway.query}")
    private String urlQuery;

    @Value("${momo.accessKey}")
    private String accessKey;

    @Value("${momo.partnerCode}")
    private String partnerCode;

    @Value("${momo.secretKey}")
    private String secretKey;

    @Value("${momo.ipnUrl}")
    private String ipnUrl;

    @Value("${momo.orderInfo}")
    private String orderInfo;

    @Value("${momo.redirectUrl}")
    private String redirectUrl;

    @Value("${momo.requestType}")
    private String requestType;

    public Map createQR(Map<String, Object> params) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        String id = "DC_" + System.currentTimeMillis();

        String amount = String.valueOf(params.get("amount"));
        String extraData = Base64.getEncoder().encodeToString(params.get("extraData").toString().getBytes());

        String rawData = String.format("accessKey=%s&amount=%s&extraData=%s&ipnUrl=%s&orderId=%s&orderInfo=%s&partnerCode=%s&redirectUrl=%s&requestId=%s&requestType=%s",
                accessKey, amount, extraData, ipnUrl, id, orderInfo, partnerCode, redirectUrl, id, requestType );
        String signature = new HmacUtils("HmacSHA256", secretKey).hmacHex(rawData);

        params.put("accessKey", accessKey);
        params.put("ipnUrl", ipnUrl);
        params.put("partnerCode", partnerCode);
        params.put("redirectUrl", redirectUrl);
        params.put("orderId", id);
        params.put("requestId", id);
        params.put("orderInfo", orderInfo);
        params.put("requestType", requestType);
        params.put("signature", signature);
        params.put("extraData", extraData);

        HttpEntity<Map> requestEntity = new HttpEntity<>(params, httpHeaders);

        ResponseEntity<Map> responseEntity = restTemplate.postForEntity(urlCreate, requestEntity, Map.class);
        Map response = responseEntity.getBody();
        return response;
    }

    public Map checkOrder(Map<String, Object> params)  {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        Map<String, String> requestData = new HashMap<>();


    // send request
        String rawData = String.format("accessKey=%s&orderId=%s&partnerCode=%s&requestId=%s",
                accessKey, params.get("orderId"), params.get("partnerCode"), params.get("requestId") );
        String signature = new HmacUtils("HmacSHA256", secretKey).hmacHex(rawData);
        requestData.put("accessKey", accessKey);
        requestData.put("orderId", String.valueOf(params.get("orderId")));
        requestData.put("partnerCode", partnerCode);
        requestData.put("requestId", String.valueOf(params.get("requestId")));
        requestData.put("signature", signature);
        HttpEntity<Map> requestEntity = new HttpEntity<>(requestData, httpHeaders);
        ResponseEntity<Map> responseEntity = restTemplate.postForEntity(urlQuery, requestEntity, Map.class);

        Map response = responseEntity.getBody();
        return response;
    }
}
