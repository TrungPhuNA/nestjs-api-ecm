import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import OrderEntity from "../../entities/order.entity";
import CreateOrderDto from "./dto/CreateOrder.dto";
import UpdateOrderDto from "./dto/UpdateOrder.dto";

@Injectable()
export class OrderService {
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>

    async store(orderDto: CreateOrderDto)
    {
        const newData = await this.orderRepository.create(orderDto);
        return await this.orderRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.orderRepository.findOne({
            where: { id }
        });
    }

    async findOrderByTransactionId(id: number, transaction_id: number)
    {
        return await this.orderRepository.findOne({
            where: { id: id, od_transaction_id: transaction_id }
        });
    }

    async update(id: number, orderDto: UpdateOrderDto)
    {
        return await this.orderRepository.update(id, orderDto);
    }
}
