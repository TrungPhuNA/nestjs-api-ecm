import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import CreateTransactionDto from "./dto/CreateTransaction.dto";
import { TransactionService } from "./transaction.service";
import { ResponseData } from "../../common/response/ResponseData";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { Paging } from "../../common/response/Paging";
import { Request } from "express";
import UpdateTransactionDto from "./dto/UpdateTransaction.dto";

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
    constructor(
        private transactionService : TransactionService
    ) {}

    @Get('lists')
    async getListsTransaction(
        @Req() req: Request
    )
    {
        const paging = {
            page: req.query.page || 1,
            page_size: req.query.page_size || 10,
        }

        const filters = {
            hot : req.query.hot || "",
            status : req.query.status || "",
            sort: req.query.sort || "",
            category_id: req.query.category_id || "",
        }

        const response = await this.transactionService.getListsTransaction(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() formData : CreateTransactionDto,
        @Req() req: Request
    ) {
        try{
            const user: any  = req.user;
            const data = await this.transactionService.create(formData, parseInt(user.id));
            return new ResponseData(HttpStatus.OK, data, 'success' );
        }catch (e) {
            console.log('----------ERROR: TransactionController@create => ', e);
            return new ResponseData(HttpStatus.INTERNAL_SERVER_ERROR, e.response,'error');
        }
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Body() formData : UpdateTransactionDto,
        @Req() req: Request,
        @Param('id') id: number
    )
    {
        const user: any  = req.user;
        const data = await this.transactionService.update(formData, parseInt(user.id), id);
        return new ResponseData(HttpStatus.OK, data);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    async delete()
    {

    }
}
