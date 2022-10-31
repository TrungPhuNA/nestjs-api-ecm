import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import ArticleEntity from "../../entities/article.entity";
import CreateArticleDto from "./dto/CreateArticle.dto";
import UpdateArticleDto from "./dto/UpdateArticle.dto";

@Injectable()
export class ArticleService {
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>

    async getListsArticles(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.hot) condition.a_hot = filters.hot;
        if (filters.status) condition.a_status = filters.status;

        return await this.articleRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async store(articleDto: CreateArticleDto)
    {
        const newData = await this.articleRepository.create(articleDto);
        return await this.articleRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.articleRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, articleDto: UpdateArticleDto)
    {
        await this.articleRepository.update(id, articleDto);
        return await this.show(id);
    }
}
