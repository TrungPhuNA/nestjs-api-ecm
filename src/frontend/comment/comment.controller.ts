import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { CommentService } from "./comment.service";
import CreateVoteDto from "../vote/dto/CreateVote.dto";
import UpdateVoteDto from "../vote/dto/UpdateVote.dto";
import { ApiTags } from "@nestjs/swagger";
import CreateCommentDto from "./dto/CreateComment.dto";
import UpdateCommentDto from "./dto/UpdateComment.dto";

@Controller('comment')
@ApiTags("Comment")
export class CommentController {

    constructor(private commentService: CommentService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('lists')
    async getListsComments(
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

        const response = await this.commentService.getListsComments(id, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(filters.page), Number(filters.page_size), total);

        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    @Post('store')
    async store(
        @Body() commentDto: CreateCommentDto
    )
    {
        const data = await this.commentService.store(commentDto);
        return new ResponseData(200, data);
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    )
    {
        const data = await this.commentService.show(id);
        return new ResponseData(200, data);
    }

    @Put('update/:id')
    async update(
        @Body() commentDto: UpdateCommentDto,
        @Param('id') id: number
    )
    {
        const response = await this.commentService.update(id, commentDto);
        return new ResponseData(200, response);
    }
}
