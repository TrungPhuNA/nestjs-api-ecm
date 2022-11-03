import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ExceptionsLoggerFilter } from "./utils/exceptionsLogger.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('API with NestJS')
        .setDescription('API developed throughout the API with NestJS course')
        .setVersion('1.0')
        .build();

    app.setGlobalPrefix('api');
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));

    app.useGlobalPipes(new ValidationPipe());

    const port = configService.get('PORT') ?? 3000;
    await app.listen(port);
}

bootstrap();
