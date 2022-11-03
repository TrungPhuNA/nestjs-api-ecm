import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../frontend/user/user.service";
import { JwtService } from "@nestjs/jwt";
import RegisterDto from "./dto/Register.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.phone, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async create(userDto: RegisterDto) {
        const user = await this.userService.register(userDto);
        console.log('----------- user: ', user);
        if (user) {

            return await this.login(user)
        }

        throw new HttpException('Error create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async showUser(id: number)
    {
        return await this.userService.findById(id);
    }
}
