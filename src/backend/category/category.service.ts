import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CategoryEntity from "../../entities/category.entity";
import CreateCategoryDto from "./dto/CreateCategory.dto";
import UpdateCategoryDto from "./dto/UpdateCategory.dto";

@Injectable()
export class CategoryService {

    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>

    async getListsCategory()
    {
        return await this.categoryRepository.findAndCount();
    }

    async store(categoryDto: CreateCategoryDto)
    {
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
        await this.categoryRepository.update(id, categoryDto);
        return await this.show(id);
    }
}
