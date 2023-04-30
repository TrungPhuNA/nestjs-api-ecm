import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "../category/category.service";
import { LogApiService } from "./log-api.service";
import CreateCommentDto from "../comment/dto/CreateComment.dto";
import { ResponseData } from "../../common/response/ResponseData";

@Controller('log-api')
@ApiTags('Log API')
export class LogApiController {
    constructor(private logApiService: LogApiService) {}

    @Post('store')
    async store(
        @Body() formData: any
    )
    {
        const data = await this.logApiService.store(formData);
        return new ResponseData(200, data);
    }
}
