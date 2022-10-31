import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserEntity from "../../entities/user.entity";

@Injectable()
export class UserService {
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>

    async findOneByUsername(username: string) {
        return this.userRepository.findOne({
            where : {
                username : username
            }
        });
    }

    async findById(id: number) {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async updateInfo(id: number, updateUser: any)
    {
        await this.userRepository.update(id, updateUser);
        return await this.findById(id);
    }
}
