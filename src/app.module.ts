import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import * as Joi from '@hapi/joi';
import { ExceptionsLoggerFilter } from "./utils/exceptionsLogger.filter";
import { APP_FILTER } from "@nestjs/core";
import { PaymentModule } from './payment/payment.module';
import { HttpModule } from "@nestjs/axios";
import { ServiceCore } from "./curl/serviceCore";

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: async () => ({
                timeout: 120000,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        BackendModule,
        FrontendModule,
        DatabaseModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                MYSQL_HOST: Joi.string().required(),
                MYSQL_PORT: Joi.number().required(),
                MYSQL_USER: Joi.string().required(),
                MYSQL_PASSWORD: Joi.string().required(),
                MYSQL_DB: Joi.string().required(),
                PORT: Joi.number(),
                UPLOADED_FILES_DESTINATION: Joi.string().required()
            }),
        }),
        AuthModule,
        UploadModule,
        PaymentModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionsLoggerFilter,
        },
    ]
})
export class AppModule {}
