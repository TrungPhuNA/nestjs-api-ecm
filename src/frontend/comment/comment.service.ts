import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommentEntity from "../../entities/comment.entity";
import CreateCommentDto from "./dto/CreateComment.dto";
import UpdateCommentDto from "./dto/UpdateComment.dto";

@Injectable()
export class CommentService {
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>
    async getListsComments(user_id: number, filters: any)
    {
        let condition: any = {};

        if (filters.status)
            condition.t_status = filters.status;

        if (filters.user_id)
            condition.t_user_id = filters.user_id;

        let order: any = { id: "DESC"};

        console.log('------------- filters: ', filters);
        return await this.commentRepository.findAndCount({
            where: condition,
            order: order,
            take: filters.page_size,
            skip: (filters.page - 1) * filters.page_size
        });
    }

    async store(commentDto: CreateCommentDto)
    {
        const newData = await this.commentRepository.create(commentDto);
        return await this.commentRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.commentRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, commentDto: UpdateCommentDto)
    {
        await this.commentRepository.update(id, commentDto);
        return await this.show(id);
    }
}
