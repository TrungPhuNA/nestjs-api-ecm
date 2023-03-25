import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import CreateTransactionDto from "./dto/CreateTransaction.dto";
import { TransactionService } from "./transaction.service";
import { ResponseData } from "../../common/response/ResponseData";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { Paging } from "../../common/response/Paging";
import { Request } from "express";
import UpdateTransactionDto from "./dto/UpdateTransaction.dto";
import { RealIP } from "nestjs-real-ip";

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
    constructor(
        private transactionService : TransactionService
    ) {}

    @UseGuards(JwtAuthGuard)
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

    @Post('create')
    async create(
        @Body() formData : CreateTransactionDto,
        @Req() req: Request,
        @RealIP() ip: string
    ) {
        try{
            const user: any  = req.user;
            let userID = (user && user.id) ? user.id : 0;
            const data = await this.transactionService.create(formData, parseInt(userID), ip);
            const [transaction, link] = data;
            return new ResponseData(HttpStatus.OK, {
                'transaction' : transaction,
                'link' : link
            }, 'success' );
        }catch (e) {
            console.log('----------ERROR: TransactionController@create => ', e);
            return new ResponseData(HttpStatus.INTERNAL_SERVER_ERROR, e.response,'error');
        }
    }

    @Post('gen-link-tt-online')
    async getLinkTTOnline(
        @Body() formData : any,
        @Req() req: Request,
        @RealIP() ip: string
    ) {
        try{
            let data = {
                t_total_money: formData.money,
                id: Math.floor(Math.random() * 1000000),
                url_callback: formData.url_callback
            }
            const response = await this.transactionService.getLinkPaymentVnpay(data);
            if (response.status && response.status == 'success') {
                return response.data.link_payment;
            }
        }catch (e) {
            console.log('----------ERROR: getLinkTTOnline@create => ', e);
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
    async delete(
        @Req() req: Request,
        @Param('id') id: number
    )
    {
        const user: any  = req.user;
        const data = await this.transactionService.deleteTransaction(parseInt(user.id), id);
        return new ResponseData(HttpStatus.OK, data);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        try{
            const data = await this.transactionService.show(id);
            return new ResponseData(HttpStatus.OK, data);
        }catch (e) {
            console.log('----------ERROR: TransactionController@show => ', e);
            return new ResponseData(HttpStatus.INTERNAL_SERVER_ERROR, e.response,'error');
        }
    }

    @Get('config')
    async getConfig()
    {
        try{
            const data = {
                "status" : [
                    {
                        'value' : 1,
                        'name' : 'Khởi tạo'
                    },
                    {
                        'value' : 2,
                        'name' : 'Chờ xử lý'
                    },
                    {
                        'value' : 3,
                        'name' : 'Chờ lấy hàng'
                    },
                ]
            }
            return new ResponseData(HttpStatus.OK, data);
        }catch (e) {
            console.log('----------ERROR: TransactionController@getConfig => ', e);
            return new ResponseData(HttpStatus.INTERNAL_SERVER_ERROR, e.response,'error');
        }
    }
}
