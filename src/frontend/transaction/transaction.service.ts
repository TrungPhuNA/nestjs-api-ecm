import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

@Injectable()
export class TransactionService {
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>

    constructor(
        private productService: ProductService,
        private orderService: OrderService,
    ) {
    }

    async getListsTransaction(paging: any, filters: any)
    {
        let condition: any = {};

        let order: any = { id: "DESC"};

        return await this.transactionRepository.findAndCount({
            where: condition,
            order: order,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async create(transactionDto: CreateTransactionDto, userID: number)
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
            total_price += item.total_price;
        }


        let newTransaction = new StoreTransactionDto();
        newTransaction.t_total_money = total_price;
        newTransaction.t_total_discount = total_discount;
        newTransaction.t_user_id = userID;
        newTransaction.t_note = transactionDto.note;

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

        return transaction;
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
}
