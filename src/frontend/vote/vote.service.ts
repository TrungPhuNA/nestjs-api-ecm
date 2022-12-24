import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import VoteEntity from "../../entities/vote.entity";
import CreateVoteDto from "./dto/CreateVote.dto";
import UpdateVoteDto from "./dto/UpdateVote.dto";

@Injectable()
export class VoteService {
    @InjectRepository(VoteEntity)
    private voteRepository: Repository<VoteEntity>
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
            take: filters.page_size,
            skip: (filters.page - 1) * filters.page_size
        });
    }

    async store(voteDto: CreateVoteDto)
    {
        const newData = await this.voteRepository.create(voteDto);
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
        await this.voteRepository.update(id, voteDto);
        return await this.show(id);
    }
}
