import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserEntity from "../../entities/user.entity";
import RegisterDto from "../../auth/dto/Register.dto";

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


}
