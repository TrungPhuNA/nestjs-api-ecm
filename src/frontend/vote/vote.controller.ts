import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
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

    @UseGuards(JwtAuthGuard)
    @Get('lists')
    async getListsVote(
        @Request() req,
    )
    {
        const { id, user } = req.user;
        const filters = {
            status : req.query.status || "",
            sort: req.query.sort || "",
            page: req.query.page || 1,
            page_size: req.query.page_size || 10,
        }

        const response = await this.voteService.getListsVote(id, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(filters.page), Number(filters.page_size), total);

        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    @Post('store')
    async store(
        @Body() voteDto: CreateVoteDto
    )
    {
        const data = await this.voteService.store(voteDto);
        return new ResponseData(200, data);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.voteService.show(id);
        return new ResponseData(200, data);
    }

    @Put('update/:id')
    async update(
        @Body() voteDto: UpdateVoteDto,
        @Param('id') id: number
    )
    {
        const response = await this.voteService.update(id, voteDto);
        return new ResponseData(200, response);
    }
}
