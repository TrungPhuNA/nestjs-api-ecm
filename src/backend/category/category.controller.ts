import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import CreateCategoryDto from "./dto/CreateCategory.dto";
import UpdateCategoryDto from "./dto/UpdateCategory.dto";
import { ResponseData } from "../../common/response/ResponseData";
import { Request } from 'express';
import { Paging } from "../../common/response/Paging";

@Controller('cms/category')
@ApiTags('BE / Category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Get('lists')
    async getListsCategory(
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

        const response = await this.categoryService.getListsCategory(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(200, data, "success", pagingData);
    }

    @Post('store')
    async store(
        @Body() categoryDto: CreateCategoryDto
    )
    {
        const data = await this.categoryService.store(categoryDto);
        return new ResponseData(200, data);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.categoryService.show(id);
        return new ResponseData(200, data);
    }

    @Put('update/:id')
    async update(
        @Body() categoryDto: UpdateCategoryDto,
        @Param('id') id: number
    )
    {
        const response = await this.categoryService.update(id, categoryDto);
        return new ResponseData(200, response);
    }

    @Delete('delete/:id')
    async delete(
        @Param('id') id: number
    )
    {
        const response = await this.categoryService.deleteCategory(id);
        return new ResponseData(200, response);
    }
}
