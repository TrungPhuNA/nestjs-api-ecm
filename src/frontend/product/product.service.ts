import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import ProductEntity from "../../entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>

    async getListsProducts()
    {
        return await this.productRepository.findAndCount();
    }
}
