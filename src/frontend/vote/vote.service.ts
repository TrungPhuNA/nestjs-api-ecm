import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import VoteEntity from "../../entities/vote.entity";
import CreateVoteDto from "./dto/CreateVote.dto";
import UpdateVoteDto from "./dto/UpdateVote.dto";
import { ProductService } from "../product/product.service";

@Injectable()
export class VoteService {
    @InjectRepository(VoteEntity)
    private voteRepository: Repository<VoteEntity>

    constructor(
        private productService: ProductService,
    ) {
    }

    async getListsVote(user_id: number, filters: any)
    {
        let condition: any = {};

        if (filters.status)
            condition.t_status = filters.status;

        if (filters.user_id)
            condition.t_user_id = filters.user_id;

        let order: any = { id: "DESC"};

        console.log('------------- filters: ', filters);
        return await this.voteRepository.findAndCount({
            where: condition,
            order: order,
            relations: {
                product: true
            },
            take: filters.page_size,
            skip: (filters.page - 1) * filters.page_size
        });
    }

    async store(voteDto: CreateVoteDto)
    {
        const product = await this.productService.show(voteDto.v_product_id);
        if (!product) {
            throw new HttpException(`Sản phẩm có mã ${voteDto.v_product_id} không tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        voteDto.created_at = new Date();
        const newData = await this.voteRepository.create(voteDto);
        this.productService.incrementProduction(voteDto.v_product_id, voteDto.v_number);
        return await this.voteRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.voteRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, voteDto: UpdateVoteDto)
    {
        const product = await this.productService.show(voteDto.v_product_id);
        if (!product) {
            throw new HttpException(`Sản phẩm có mã ${voteDto.v_product_id} không tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        delete voteDto.v_number;
        voteDto.updated_at = new Date();
        await this.voteRepository.update(id, voteDto);
        return await this.show(id);
    }

    async delete(id : number, user_id: number)
    {
        const vote = await this.show(id);
        this.productService.decrementProduction(vote.v_product_id, vote.v_number);

        await this.voteRepository.delete(id);
    }
}
