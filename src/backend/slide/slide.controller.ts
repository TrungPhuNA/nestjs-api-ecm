import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { ApiTags } from "@nestjs/swagger";
import { SlideService } from "./slide.service";
import CreateSlideDto from "./dto/CreateSlide.dto";
import UpdateSlideDto from "./dto/UpdateSlide.dto";

@Controller('cms/slide')
@ApiTags('BE / Slide')
export class SlideController {
    constructor(private slideService: SlideService) {}

    @Get('lists')
    async getLists(
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

        const response = await this.slideService.getLists(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(200, data, "success", pagingData);
    }

    @Post('store')
    async store(
        @Body() slideDto: CreateSlideDto
    )
    {
        const data = await this.slideService.store(slideDto);
        return new ResponseData(200, data);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.slideService.show(id);
        console.log('--------- data: ', id);
        return new ResponseData(200, data);
    }

    @Put('update/:id')
    async update(
        @Body() slideDto: UpdateSlideDto,
        @Param('id') id: number
    )
    {
        const response = await this.slideService.update(id, slideDto);
        return new ResponseData(200, response);
    }
}
