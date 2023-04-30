import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import ProductEntity from "../../entities/product.entity";
import { Repository, Raw, Like, MoreThan, In } from "typeorm";

@Injectable()
export class ProductService {

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>

    async getListsProducts(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.hot) condition.c_hot = filters.pro_hot;
        if (filters.status) condition.c_status = filters.pro_status;
        if (filters.category_id) condition.pro_category_id = filters.category_id;
        if (filters.sale) {
            condition.pro_discount_value = MoreThan(0);
        }
        if (filters.name) {
            condition.pro_name = Like(`or %${filters.name}%`);
            condition.pro_slug = Like(`or %${filters.name}%`);
        }

        console.log('------------ product_ids: ', filters.product_ids);

        if (filters.product_ids)
        {
            let ids = filters.product_ids.split(',');
            condition.id = In(ids);
        }


        let order: any = { id: "DESC"};

        if (filters.sort)
        {
            let arrSort: any = filters.sort.split(",");
            if (arrSort[0] &&  arrSort[1]) {
                let orderBy = arrSort[1] == "desc" ? "DESC" : "ASC";
                if (arrSort[0] == "pro_sale") {
                    order = { pro_sale: orderBy};
                }
            }
        }

        return await this.productRepository.findAndCount({
            where: condition,
            order: order,
            relations: {
                category: true
            },
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async show(id: number)
    {
        return await this.productRepository.findOne({
            where: {
                id: id
            },
            relations: {category : true},
        })
    }

    async showSlug(slug: string)
    {
        return await this.productRepository.findOne({
            where: {
                pro_slug: slug
            },
            relations: {category : true},
        })
    }

    async incrementProduction(id: number, vote: number)
    {
        const product = await this.productRepository.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        if ( product) {
            product.pro_review_total++;
            product.pro_review_star += vote;
            await this.productRepository.save(product);
        }
    }

    async decrementProduction(id: number, vote: number)
    {
        const product = await this.productRepository.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        if ( product) {
            product.pro_review_total--;
            product.pro_review_star -= vote;
            await this.productRepository.save(product);
        }
    }
}
