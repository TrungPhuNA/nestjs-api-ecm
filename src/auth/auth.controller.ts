import { Controller, Post, UseGuards, Request, Get, HttpStatus, HttpException, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ResponseData } from "../common/response/ResponseData";
import RegisterDto from "./dto/Register.dto";
import * as bcrypt from 'bcrypt';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    public async register(
        @Body() registrationData: RegisterDto
    ) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.authService.create({
                ...registrationData,
                password: hashedPassword
            });

            return new ResponseData(HttpStatus.OK, createdUser);
        } catch (error) {
            console.log('--------- Error: ', error);
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        const data = await this.authService.login(req.user);
        return new ResponseData(HttpStatus.OK, data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const { id, user } = req.user;
        const data = await this.authService.showUser(id);
        return new ResponseData(HttpStatus.OK, data);
    }
}
