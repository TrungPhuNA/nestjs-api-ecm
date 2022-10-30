import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CategoryEntity from "../../entities/category.entity";

@Injectable()
export class CategoryService {
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>

    async getListsCategory(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.hot) condition.c_hot = filters.c_hot;
        if (filters.status) condition.c_status = filters.c_status;

        let order: any = { id: "DESC"};

        return await this.categoryRepository.findAndCount({
            where: condition,
            order: order,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async show(id: number)
    {
        return await this.categoryRepository.findOne({
            where: {
                id: id
            }
        })
    }
}
