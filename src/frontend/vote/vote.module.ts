import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import VoteEntity from "../../entities/vote.entity";
import { ProductModule } from "../product/product.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            VoteEntity
        ]),
        ProductModule,
    ],
    providers: [VoteService],
    controllers: [VoteController]
})
export class VoteModule {}
