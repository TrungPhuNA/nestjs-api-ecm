import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import CreateCategoryDto from "./dto/CreateCategory.dto";
import UpdateCategoryDto from "./dto/UpdateCategory.dto";

@Controller('cms/category')
@ApiTags('BE / Category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Get('lists')
    async getListsCategory()
    {
        return await this.categoryService.getListsCategory();
    }

    @Post('store')
    async store(
        @Body() categoryDto: CreateCategoryDto
    )
    {
        return await this.categoryService.store(categoryDto)
    }

    @Get('show/:id')
    async show(id)
    {
        return await this.categoryService.show(id);
    }

    @Put('update/:id')
    async update(
        @Body() categoryDto: UpdateCategoryDto,
        @Param('id') id: number
    )
    {
        return await this.categoryService.update(id, categoryDto)
    }
}
