import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req } from "@nestjs/common";
import { CustomRequest } from "app/types/request.interface";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./comment.entity";
import { CommentService } from "./comment.service";
import { ForumCommentParamDTO } from "./dto/forum-comment-param.dto";
import { ForumParamDTO } from "../forum/dto/forum-param.dto";

@Controller("forums/:forumId/comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param() param: ForumParamDTO,
    @Req() req: CustomRequest,
  ): Promise<Comment> {
    return this.commentService.createComment(createCommentDto, param.forumId, req.user.sub);
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param() param: ForumCommentParamDTO, 
    @Req() req: CustomRequest,
  ) {
    await this.commentService.deleteComment(param.commentId, param.forumId, req.user.sub);
  }

  @Get()
  async getComment(
    @Param() param: ForumParamDTO,
  ) {
    return await this.commentService.getComments(param.forumId);
  }
}
