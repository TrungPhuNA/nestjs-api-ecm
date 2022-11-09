import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import UserEntity from "../../entities/user.entity";
import RegisterDto from "../../auth/dto/Register.dto";
import UpdatePhoneUserDto from "./dto/UpdatePhoneUser.dto";
import UpdateEmailUserDto from "./dto/UpdateEmailUser.dto";
import UpdatePasswordUserDto from "./dto/UpdatePasswordUser.dto";
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

    async updatePhone(id: number, updatePhone: UpdatePhoneUserDto)
    {
        // lấy thông tin user;
        const user = await this.findById(id);

        // check số điện thoại
        const checkPhone = await this.userRepository.findOne({
            where: {
                phone: updatePhone.phone,
                id: Not(id)
            }
        });

        if (checkPhone) {
            // Đã tồn tại tài khoản
            throw new HttpException(`Error update phone ${updatePhone.phone} user`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        user.phone = updatePhone.phone;

        await this.userRepository.update(id, user);

        return await this.findById(id);
    }

    async updateEmail(id: number, updateEmail: UpdateEmailUserDto)
    {
        // lấy thông tin user;
        const user = await this.findById(id);

        // check email
        const checkEmail = await this.userRepository.findOne({
            where: {
                email: updateEmail.email,
                id: Not(id)
            }
        });

        if (checkEmail) {
            // Đã tồn tại tài khoản
            throw new HttpException(`Error update email ${updateEmail.email} user`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        user.email = updateEmail.email;

        await this.userRepository.update(id, user);

        return await this.findById(id);
    }

    async updatePassword(id: number, updatePassword: UpdatePasswordUserDto)
    {
        // lấy thông tin user;
        const user = await this.findById(id);
        // Check pass cũ có khớp ko


        // Check pass mới có trùng với pass confirm ko

        // mã hoá và lưu mật khẩu
        // await this.userRepository.update(id, user);

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
