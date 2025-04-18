import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Comment } from "./comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { JwtPayload } from "../shared/auth/model";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    forumId: string,
    user: JwtPayload,
  ): Promise<Comment> {
    const { content } = createCommentDto;

    const comment = this.commentRepository.create({
      content,
      userId: user.sub,
      userName: user.name,
      forumId,
    });

    return this.commentRepository.save(comment);
  }

  async deleteComment(
    commentId: string,
    forumId: string,
    userId: string,
  ): Promise<void> {
    await this.getOwnedCommentOrFail(commentId, forumId, userId);
    await this.commentRepository.delete(commentId);
  }

  private async getOwnedCommentOrFail(
    commentId: string,
    forumId: string,
    userId: string,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, forumId },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException("You are not the owner of this comment");
    }

    return comment;
  }

  async getComments(forumId: string): Promise<Comment[]> {
    return await this.commentRepository.find({ where: { forumId } });
  }
}
