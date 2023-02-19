import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('payment')
@ApiTags('Payment Online')
export class PaymentController {
    @Post('send-service')
    async pushPayment(
        @Body() paymentData: any,
        @Request() req,
    )
    {
        var dateFormat = require('dateformat');


        var tmnCode = 'Q2KB8XR2';
        var secretKey = 'VICWBIDMSXXFAOSSKCHRRLYRZWKENRYG';
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        var returnUrl = 'https://123code.net';

        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = req.body.amount;
        var bankCode = req.body.bankCode;

        var orderInfo = req.body.orderDescription;
        var orderType = req.body.orderType;
        var locale = req.body.language;
        if(locale === null || locale === ''){
            locale = 'vn';
        }
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = req.ip;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = await this.sortObject(vnp_Params);

        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        return vnpUrl;


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

    async sortObject(obJectParams: any)
    {
        let sortable = [];
        for (var vehicle in obJectParams) {
            sortable.push([vehicle, obJectParams[vehicle]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        return sortable;
    }
}
