import { Controller, Get } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags('HOME')
export class AppController {
    @Get()
    getHello(): string {
        return "API ECM";
    }
}
