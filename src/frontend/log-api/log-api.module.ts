import { Module } from '@nestjs/common';
import { LogApiController } from './log-api.controller';
import { LogApiService } from './log-api.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import LogApi from "../../entities/log_api.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            LogApi
        ]),
    ],
    controllers: [LogApiController],
    providers: [LogApiService]
})
export class LogApiModule {}
