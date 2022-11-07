import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { CategoryService } from "./category.service";

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get('lists')
    async getListsCategory(
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
            sort: req.query.sort || ""
        }

        const response = await this.categoryService.getListsCategory(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        console.log('-------------- show', id);
        const data = await this.categoryService.show(id);
        return new ResponseData(HttpStatus.OK, data);
    }
}
