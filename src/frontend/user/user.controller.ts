import { Body, Controller, HttpStatus, Put, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ResponseData } from "../../common/response/ResponseData";
import UpdateInfoUserDto from "./dto/UpdateInfoUser.dto";
import UpdatePhoneUserDto from "./dto/UpdatePhoneUser.dto";
import UpdateEmailUserDto from "./dto/UpdateEmailUser.dto";
import UpdatePasswordUserDto from "./dto/UpdatePasswordUser.dto";

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(private userService: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-info')
    async updateInfo(
        @Request() req,
        @Body() userUpdate: UpdateInfoUserDto
    )
    {
        const { id, user } = req.user;

        const data = await this.userService.updateInfo(id, userUpdate);
        return new ResponseData(HttpStatus.OK, data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-email')
    async updateEmail(
        @Request() req,
        @Body() formData: UpdateEmailUserDto
    )
    {
        const { id, user } = req.user;

        const data = await this.userService.updateEmail(id, formData);
        return new ResponseData(HttpStatus.OK, data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-password')
    async updatePassword(
        @Request() req,
        @Body() formData: UpdatePasswordUserDto
    )
    {
        const { id, user } = req.user;

        const data = await this.userService.updatePassword(id, formData);
        return new ResponseData(HttpStatus.OK, data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-phone')
    async updatePhone(
        @Request() req,
        @Body() formData: UpdatePhoneUserDto
    )
    {
        const { id, user } = req.user;

        const data = await this.userService.updatePhone(id, formData);
        return new ResponseData(HttpStatus.OK, data);
    }
}
