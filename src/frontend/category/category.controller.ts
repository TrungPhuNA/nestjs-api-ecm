import { Controller, Get} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    @Get('lists')
    async getListsProducts()
    {
        // return await this.productService.getListsProducts();
    }

    @Get('show/:id')
    async show()
    {
        // return await this.productService.getListsProducts();
    }
}
