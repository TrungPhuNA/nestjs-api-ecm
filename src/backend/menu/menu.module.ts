import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import Menu from "../../entities/menu.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Menu
        ])
    ],
    controllers: [MenuController],
    providers: [MenuService]
})
export class MenuModule {}
