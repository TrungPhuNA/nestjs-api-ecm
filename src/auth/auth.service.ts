import { Injectable } from '@nestjs/common';
import { UserService } from "../frontend/user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        console.log('------------ user: ', user);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        console.log('----------------- AuthService@login => user : ', user);
        const payload = { username: user.phone, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async showUser(id: number)
    {
        return await this.userService.findById(id);
    }
}
