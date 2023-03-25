import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserEntity from "../../entities/user.entity";

@Injectable()
export class UserService {

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>

    async getListsUser(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.hot) condition.c_hot = filters.pro_hot;
        if (filters.status) condition.c_status = filters.pro_status;

        return await this.userRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

}
