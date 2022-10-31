import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { MenuService } from "./menu.service";
import CreateMenuDto from "./dto/CreateMenu.dto";
import UpdateMenuDto from "./dto/UpdateMenu.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('cms/menu')
@ApiTags('BE / Menu')
export class MenuController {
    constructor(private menuService: MenuService) {}

    @Get('lists')
    async getListsMenus(
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

        const response = await this.menuService.getListsMenus(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(200, data, "success", pagingData);
    }

    @Post('store')
    async store(
        @Body() menuDto: CreateMenuDto
    )
    {
        const data = await this.menuService.store(menuDto);
        return new ResponseData(200, data);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.menuService.show(id);
        console.log('--------- data: ', id);
        return new ResponseData(200, data);
    }

    @Put('update/:id')
    async update(
        @Body() menuDto: UpdateMenuDto,
        @Param('id') id: number
    )
    {
        const response = await this.menuService.update(id, menuDto);
        return new ResponseData(200, response);
    }
}
