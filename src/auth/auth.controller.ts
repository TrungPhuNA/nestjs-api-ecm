import { Controller, Post, UseGuards, Request, Get, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ResponseData } from "../common/response/ResponseData";

@Controller('auth')
@ApiTags("Auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const { id, user } = req.user;
        const data = await this.authService.showUser(id);
        return new ResponseData(HttpStatus.OK, data);
    }
}
