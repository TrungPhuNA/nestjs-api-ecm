import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request,
    UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ResponseData } from "../../common/response/ResponseData";
import { ApiTags } from "@nestjs/swagger";
import { VoteService } from "./vote.service";
import { Paging } from "../../common/response/Paging";
import CreateVoteDto from "./dto/CreateVote.dto";
import UpdateVoteDto from "./dto/UpdateVote.dto";

@Controller('vote')
@ApiTags("Vote")
export class VoteController {
    constructor(private voteService: VoteService) {
    }

    @Get('lists')
    async getListsVote(
        @Request() req,
    )
    {
        const filters = {
            status : req.query.status || "",
            sort: req.query.sort || "",
            page: req.query.page || 1,
            page_size: req.query.page_size || 10,
        }

        const response = await this.voteService.getListsVote(filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(filters.page), Number(filters.page_size), total);

        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    @Post('store')
    @UseGuards(JwtAuthGuard)
    async store(
        @Body() voteDto: CreateVoteDto,
        @Request() req,
    )
    {
        const { id, user } = req.user;
        voteDto.v_user_id = id;
        const data = await this.voteService.store(voteDto);
        return new ResponseData(200, data);
    }

    @Get('show/:id')
    @UseGuards(JwtAuthGuard)
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.voteService.show(id);
        return new ResponseData(200, data);
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Body() voteDto: UpdateVoteDto,
        @Param('id') id: number,
        @Request() req,
    )
    {
        const { user_id, user } = req.user;
        voteDto.v_user_id = id;
        const response = await this.voteService.update(id, voteDto);
        return new ResponseData(200, response);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Body() voteDto: UpdateVoteDto,
        @Param('id') id: number,
        @Request() req,
    )
    {
        const { user_id, user } = req.user;
        const response = await this.voteService.delete(id, parseInt(user_id));
        return new ResponseData(200, response);
    }
}
