import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import TransactionEntity from "../../entities/transaction.entity";
import { ProductModule } from "../../frontend/product/product.module";
import { OrderModule } from "../../frontend/order/order.module";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TransactionEntity
        ]),
        ProductModule,
        OrderModule,
        HttpModule
    ],
    controllers: [TransactionController],
    providers: [TransactionService]
})
export class TransactionModule {}
