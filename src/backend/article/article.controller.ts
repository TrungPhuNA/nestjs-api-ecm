import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req } from "@nestjs/common";
import { Request } from "express";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { ArticleService } from "./article.service";
import CreateArticleDto from "./dto/CreateArticle.dto";
import UpdateArticleDto from "./dto/UpdateArticle.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('cms/article')
@ApiTags('BE / Article')
export class ArticleController {

    constructor(private articleService: ArticleService) {}

    @Get('lists')
    async getListsArticles(
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

        const response = await this.articleService.getListsArticles(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(200, data, "success", pagingData);
    }

    @Post('store')
    async store(
        @Body() articleDto: CreateArticleDto
    )
    {
        const data = await this.articleService.store(articleDto);
        return new ResponseData(200, data);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.articleService.show(id);
        return new ResponseData(200, data);
    }

    @Put('update/:id')
    async update(
        @Body() articleDto: UpdateArticleDto,
        @Param('id') id: number
    )
    {
        const response = await this.articleService.update(id, articleDto);
        return new ResponseData(200, response);
    }
}
