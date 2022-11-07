import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserEntity from "../../entities/user.entity";
import RegisterDto from "../../auth/dto/Register.dto";
const md5 = require('md5');

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

    async register(userRegister: RegisterDto)
    {
        const newData = await this.userRepository.create(userRegister);
        return await this.userRepository.save(newData);
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

    async updateRefreshToken(user_id: number, refresh_token: string)
    {
        const hashedRefreshToken = md5(refresh_token);
        await this.userRepository.update(user_id, {
            refresh_token: hashedRefreshToken,
        });
    }
}
