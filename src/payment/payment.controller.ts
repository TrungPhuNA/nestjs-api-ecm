import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('payment')
@ApiTags('Payment Online')
export class PaymentController {
    @Post('send-service')
    async pushPayment(
        @Body() paymentData: any,
    )
    {
        // // $vnp_TmnCode = "Q2KB8XR2"; //Website ID in VNPAY System
        // // $vnp_HashSecret = "VICWBIDMSXXFAOSSKCHRRLYRZWKENRYG"; //Secret key
        // // $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        // // $vnp_Returnurl = "http://seri-phongtro.abc:8888/user/nap-tien/post-back-atm-internet-banking";
        // // $vnp_apiUrl = "http://sandbox.vnpayment.vn/merchant_webapi/merchant.html";
        // let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        // var dateFormat = require('dateformat');
        // let date = new Date();
        // let createDate = dateFormat(date, 'yyyymmddHHmmss');
        //
        // // paymentData = sortObject(vnp_Params);
        // paymentData['vnp_TmnCode'] = "Q2KB8XR2";
        // var querystring = require('qs');
        // var signData = querystring.stringify(paymentData, { encode: false });
        // var crypto = require("crypto");
        // var hmac = crypto.createHmac("sha512", 'VICWBIDMSXXFAOSSKCHRRLYRZWKENRYG');
        // let signed  = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        // paymentData['vnp_SecureHash'] = signed;
        // vnpUrl += '?' + querystring.stringify(paymentData, { encode: false });
        //
        // return vnpUrl;
    }
}
