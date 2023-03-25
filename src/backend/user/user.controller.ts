import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('cms/user')
@ApiTags('BE / User')
export class UserController {

    constructor(private userService: UserService) {}

    @Get('lists')
    async getListsUser(
        @Req() request: Request
    )
    {
        const paging = {
            page: request.query.page || 1,
            page_size: request.query.page_size || 10,
        }

        const filters = {
            hot : request.query.hot || "",
            status : request.query.status || "",
        }

        const response = await this.userService.getListsUser(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(200, data, "success", pagingData);
    }
}
