import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { CustomRequest } from "app/types/request.interface";

import { CreateForumDto } from "./dto/create-forum.dto";
import { Forum } from "./forum.entity";
import { ForumService } from "./forum.service";
import { ForumParamDTO } from "./dto/forum-param.dto";
import { UpdateForumDto } from "./dto/update-forum.dto";

@Controller("forums")
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  async createForum(
    @Body() createForumDto: CreateForumDto,
    @Req() req: CustomRequest,
  ): Promise<Forum> {
    return this.forumService.createForum(createForumDto, req.user);
  }

  @Delete(":forumId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteForum(@Param() param: ForumParamDTO, @Req() req: CustomRequest) {
    await this.forumService.deleteForum(param.forumId, req.user.sub);
  }

  @Patch(":forumId")
  async updateForum(
    @Param() params: ForumParamDTO,
    @Body() updateDto: UpdateForumDto,
    @Req() req: CustomRequest,
  ) {
    return await this.forumService.updateForum(
      params.forumId,
      updateDto,
      req.user.sub,
    );
  }

  @Get()
  async getAllForum() {
    return await this.forumService.getForums();
  }
}
