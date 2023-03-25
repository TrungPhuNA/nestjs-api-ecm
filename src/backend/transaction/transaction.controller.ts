import { Controller, Get, HttpStatus, Req } from "@nestjs/common";
import { Request } from "express";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../user/user.service";
import { TransactionService } from "./transaction.service";

@Controller('cms/transaction')
@ApiTags('BE / Transaction')
export class TransactionController {

    constructor(private transactionService: TransactionService) {}

    @Get('lists')
    async getListsTransaction(
        @Req() req: Request
    )
    {
        const paging = {
            page: req.query.page || 1,
            page_size: req.query.page_size || 10,
        }
        console.log('----------- req.user: ', req.user);
        const user: any  = req.user;
        const filters = {
            hot : req.query.hot || "",
            status : req.query.status || "",
            sort: req.query.sort || "",
            category_id: req.query.category_id || "",
            user_id : user.id
        }

        const response = await this.transactionService.getListsTransaction(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }
}
