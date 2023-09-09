package com.server.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MomoPaymentRequest {
//    {
//        "accessKey": "F8BBA842ECF85",
//            "partnerCode": "MOMO",
//            "requestType": "captureMoMoWallet",
//            "notifyUrl": "https://momo.vn",
//            "returnUrl": "https://momo.vn",
//            "orderId": "MA1540456472575",
//            "amount": "150000",
//            "orderInfo": "SDK team.",
//            "requestId": "MM1540456472575",
//            "extraData": "email=abc@gmail.com",
//            "signature": "4495e1598111ccfaa17be36084017d8909bfd4a8de053e07d5db98d39d6ca2d7"
//    }
    @Value("${momo.accessKey}")
    private String accessKey;

    @Value("${momo.partnerCode}")
    private String partnerCode;
    private String requestType = "captureMoMoWallet";
    private String notifyUrl = "https://momo.vn";
    private String returnUrl = "https://momo.vn";
    private String orderId;
    private Long amount;
    private String orderInfo;
    private String requestId;
    private String extraData;
    private String signature;

}
