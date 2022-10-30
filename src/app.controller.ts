import { Controller, Get } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags('Home')
export class AppController {
    @Get()
    getHello(): string {
        return "API ECM";
    }
}
