import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../frontend/user/user.service";
import { JwtService } from "@nestjs/jwt";
import RegisterDto from "./dto/Register.dto";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import { ResponseData } from "../common/response/ResponseData";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);

        if (user) {
            const isMatchPassword = await bcrypt.compare(pass, user.password);
            if (isMatchPassword === true) {
                const { password, ...result } = user;
                return result;
            }

            throw new HttpException(`${pass} không chính xác`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        throw new HttpException(`${username} không tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async login(user: any) {
        const tokens = await this.getTokens(user.id, user.phone);
        await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
        return  tokens;
    }

    async create(userDto: RegisterDto) {

        // Check tồn tại email / phone / username
        const checkUsername = await this.userService.findOneByUsername(userDto.username);
        if (checkUsername) {
            throw new HttpException(`${userDto.username} đã tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const checkEmail = await this.userService.findOneByEmail(userDto.email);
        if (checkEmail) {
            throw new HttpException(`${userDto.email} đã tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const checkPhone = await this.userService.findOneByPhone(userDto.phone);
        if (checkPhone) {
            throw new HttpException(`${userDto.phone} đã tồn tại`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const user = await this.userService.register(userDto);
        if (user) {
            return await this.login(user)
        }

        throw new HttpException('Error create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async showUser(id: number)
    {
        return await this.userService.findById(id);
    }

    async refreshTokens(refreshToken: string) {
        let decoded =  this.jwtService.verify(refreshToken, this.configService.get('JWT_REFRESH_SECRET'));
        if (!decoded) {
            throw new BadRequestException("Không tồn tại Refresh token");
        }

        const user: any = await this.userService.findById(decoded.sub);
        if (!user || !user.refresh_token)
            throw new ForbiddenException('Access Denied');

        const tokens: any = await this.getTokens(user.id, user.username);
        await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async getTokens(userId: number, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
