import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CategoryEntity from "../../entities/category.entity";
import CreateCategoryDto from "./dto/CreateCategory.dto";
import UpdateCategoryDto from "./dto/UpdateCategory.dto";
import { toSlug } from "../../common/helpers/Function";

@Injectable()
export class CategoryService {

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>

    async getListsCategory(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.hot) condition.c_hot = filters.hot;
        if (filters.status) condition.c_status = filters.status;

        return await this.categoryRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async store(categoryDto: CreateCategoryDto)
    {
        categoryDto.c_slug = toSlug(categoryDto.c_name);
        const newData = await this.categoryRepository.create(categoryDto);
        return await this.categoryRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.categoryRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, categoryDto: UpdateCategoryDto)
    {
        categoryDto.c_slug = toSlug(categoryDto.c_name);
        await this.categoryRepository.update(id, categoryDto);
        return await this.show(id);
    }

    async deleteCategory(id: number) {
        return await this.categoryRepository.delete(id);
    }
}
