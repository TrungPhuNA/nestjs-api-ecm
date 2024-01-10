import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import ProductEntity from "../../entities/product.entity";
import CreateProductDto from "./dto/CreateProduct.dto";
import UpdateProductDto from "./dto/UpdateProduct.dto";
import { toSlug } from "../../common/helpers/Function";

@Injectable()
export class ProductService {

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>

    async getListsProducts(paging: any, filters: any)
    {
        console.log('---------- filter:', filters);
        let condition: any = {};
        if (filters.hot) condition.c_hot = filters.pro_hot;
        if (filters.status) condition.c_status = filters.pro_status;
        if (filters.name) condition.pro_name = Raw(alias => `${alias} LIKE '%${filters.name}%'`);

        return await this.productRepository.findAndCount({
            where: condition,
            relations: {
                category: true,
            },
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async store(productDto: CreateProductDto)
    {
        productDto.pro_slug = toSlug(productDto.pro_name);
        const newData = await this.productRepository.create(productDto);
        return await this.productRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.productRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, productDto: UpdateProductDto)
    {
        productDto.pro_slug = toSlug(productDto.pro_name);
        await this.productRepository.update(id, productDto);
        return await this.show(id);
    }
}
