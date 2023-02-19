import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import CreateTransactionDto from "./dto/CreateTransaction.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import TransactionEntity from "../../entities/transaction.entity";
import { ProductService } from "../product/product.service";
import StoreTransactionDto from "./dto/StoreTransaction.dto";
import CreateOrderDto from "../order/dto/CreateOrder.dto";
import { OrderService } from "../order/order.service";
import UpdateTransactionDto from "./dto/UpdateTransaction.dto";
import UpdateOrderDto from "../order/dto/UpdateOrder.dto";
import * as moment from 'moment';
import * as querystring from 'querystring';
var sortObj = require('sort-object');
import * as ip from "ip";
import { urlencoded } from "express";

@Injectable()
export class TransactionService {
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>

    private logger = new Logger('TransactionService');

    constructor(
        private productService: ProductService,
        private orderService: OrderService,
    ) {
    }

    async getListsTransaction(paging: any, filters: any)
    {
        let condition: any = {};

        if (filters.status)
            condition.t_status = filters.status;

        if (filters.user_id)
            condition.t_user_id = filters.user_id;

        let order: any = { id: "DESC"};

        console.log('------------- filters: ', filters);
        return await this.transactionRepository.findAndCount({
            where: condition,
            order: order,
            relations: {
                orders : {
                    products: true
                }
            },
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async create(transactionDto: CreateTransactionDto, userID: number, ip: any)
    {
        let products: any = transactionDto.products;
        let total_price = 0;
        let total_discount = 0;
        if (products.length == 0) {
            throw new HttpException(`Không có sản phẩm nào trong giỏ hàng`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        for(let i = 0 ; i < products.length ; i ++) {
            let item = products[i];
            let product = await this.productService.show(item.id);
            if (!product) {
                throw new HttpException(`Sản phẩm có mã ${item.id} không tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            total_price += item.total_price * item.quantity;
        }

        let newTransaction = new StoreTransactionDto();
        newTransaction.t_total_money = total_price;
        newTransaction.t_total_discount = total_discount;
        newTransaction.t_user_id = userID;
        newTransaction.t_name = transactionDto.name;
        newTransaction.t_phone = transactionDto.phone;
        newTransaction.t_note = transactionDto.note;
        newTransaction.created_at = new Date();
        console.log('------------ newTransaction: ', newTransaction);
        const transaction = await this.storeTransaction(newTransaction);
        if (transaction) {
            for(let i = 0 ; i < products.length ; i ++) {
                let item = products[i];
                let orderDto = new CreateOrderDto();
                orderDto.od_discount_type = item.discount_type;
                orderDto.od_discount_value = item.discount_value;
                orderDto.od_price = item.price;
                orderDto.od_total_price = item.total_price;
                orderDto.od_product_id = item.id;
                orderDto.od_transaction_id = transaction.id;
                orderDto.od_qty = item.quantity;
                await this.orderService.store(orderDto);
            }
        }

        let link =  await this.storeVnPay(transaction);

        return [transaction, link];
    }

    async storeVnPay(transaction: any)
    {
        // var tmnCode = '3RDGQAX3';
        // var secretKey = 'PMSBQTYJIQLJILQTWHKAESOMMTXYHFHE';
        // var returnUrl = 'http://reactjs.123code.net';
        var tmnCode = 'FKBRDBWJ';
        var secretKey = 'ZJVKCGVAJZETUKIJLDDJBLZCLFOXRDJE';
        var returnUrl = 'https://api-ecm.123code.net/api';

        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

        var date = new Date();

        let createDate = moment(date).format("YmdHis");
        // let createDate = moment(date).format("YYYYMMDDHHmmss");
        let expireDate = moment(date).add(20, 'minutes').format("YmdHis");
        console.log('-------------createDate', moment(date));
        console.log('-------------expireDate', expireDate);
        // let expireDate = moment(date).subtract(1, 'day').format("YYYYMMDDHHmmss");
        console.log('------------ createDate', createDate);
        let orderId = transaction.id;
        let amount = transaction.t_total_money;

        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_IpAddr'] = ip.address();
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_OrderInfo'] = 'ttonline';
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_ExpireDate'] = expireDate;


        vnp_Params = sortObj(vnp_Params);
        console.log('-------------- vnp_Params: ', vnp_Params);
        let signData = '?' + querystring.stringify(vnp_Params, null, null);
        const crypto = require('crypto');

        var hmac = await crypto.createHmac("sha512", secretKey);
        let hash = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        this.logger.warn(`============= hmac => :  ${hmac} `);
        vnp_Params['vnp_SecureHash'] = hash;
        console.log('===================== vnp_Params', vnp_Params);

        vnpUrl += '?' + querystring.stringify(vnp_Params, null, null);
        console.log('================== vnpUrl: ', encodeURIComponent(vnpUrl));
        return vnpUrl;
    }

    async storeTransaction(transactionDto: StoreTransactionDto)
    {
        const newData = await this.transactionRepository.create(transactionDto);
        return await this.transactionRepository.save(newData);
    }

    async update(transactionDto: UpdateTransactionDto, userID: number, id : number)
    {
        let products: any = transactionDto.products;
        let total_price = 0;
        let total_discount = 0;
        for(let i = 0 ; i < products.length ; i ++) {
            let item = products[i];
            let product = await this.productService.show(item.id);
            if (!product) {
                throw new HttpException(`Sản phẩm có mã ${item.id} không tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            if (!item.order_id) {
                throw new HttpException(`Chi tiết đơn hàng không được để trống`, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            let order = await this.orderService.findOrderByTransactionId(item.order_id, id);
            if (!order) {
                throw new HttpException(` Chi tiết đơn hàng có mã ${item.order_id} không tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            total_price += item.total_price;
        }

        const transactionUpdate = await this.findById(id);

        transactionUpdate.t_total_money = total_price;
        transactionUpdate.t_total_discount = total_discount;
        transactionUpdate.t_note = transactionDto.note;

        await this.transactionRepository.update(id, transactionUpdate);

        for(let i = 0 ; i < products.length ; i ++) {
            let item = products[i];
            let orderDto = new UpdateOrderDto();
            orderDto.od_discount_type = item.discount_type;
            orderDto.od_discount_value = item.discount_value;
            orderDto.od_price = item.price;
            orderDto.od_total_price = item.total_price;
            orderDto.od_product_id = item.id;
            orderDto.od_transaction_id = id;
            orderDto.od_qty = item.quantity;

            await this.orderService.update(item.order_id, orderDto);
        }

        return await this.findById(id);
    }

    async findById(id: number)
    {
        return await this.transactionRepository.findOne({
            where:{ id }
        });
    }

    async deleteTransaction(user_id: number, id: number)
    {
        await this.transactionRepository.delete(id);
    }

    async show(id: number)
    {
        return await this.transactionRepository.findOne({
            where:{ id },
            relations: {
                orders : true
            },
        });
    }
}
