import { Controller, Get, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('product')
@ApiTags("Product")
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('lists')
    async getListsProducts()
    {
        return await this.productService.getListsProducts();
    }

    @Post('store')
    async store()
    {
        return await this.productService.getListsProducts();
    }

    @Get('show/:id')
    async show()
    {
        return await this.productService.getListsProducts();
    }

    @Put('update/:id')
    async update()
    {
        return await this.productService.getListsProducts();
    }
}
