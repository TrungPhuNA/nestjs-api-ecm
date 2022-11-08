import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import TransactionEntity from "../../entities/transaction.entity";
import { ProductModule } from "../product/product.module";
import { OrderModule } from "../order/order.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionEntity
        ]),
        ProductModule,
        OrderModule
    ],
    controllers: [TransactionController],
    providers: [TransactionService]
})
export class TransactionModule {}
