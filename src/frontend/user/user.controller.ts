import { Body, Controller, HttpStatus, Put, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ResponseData } from "../../common/response/ResponseData";
import UpdateInfoUserDto from "./dto/UpdateInfoUser.dto";

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
}
