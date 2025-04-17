import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateForumDto } from "./dto/create-forum.dto"; // Import the DTO
import { Forum } from "./forum.entity"; // Import the Forum entity
import { UpdateForumDto } from "./dto/update-forum.dto";

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,
  ) {}

  async createForum(
    createForumDto: CreateForumDto,
    userId: string,
  ): Promise<Forum> {
    const { title, description, tags } = createForumDto;

    const forum = this.forumRepository.create({
      title,
      description,
      tags,
      userId,
    });

    return this.forumRepository.save(forum); // Save the forum in the database
  }

  async deleteForum(forumId: string, userId: string): Promise<void> {
    await this.getOwnedForumOrFail(forumId, userId);
    await this.forumRepository.delete(forumId);
  }

  async updateForum(
    forumId: string,
    updateDto: UpdateForumDto,
    userId: string,
  ): Promise<Forum> {
    const forum = await this.getOwnedForumOrFail(forumId, userId);

    Object.assign(forum, updateDto);
    return await this.forumRepository.save(forum);
  }

  async getForums(): Promise<Forum[]> {
    return await this.forumRepository.find();
  }

  private async getOwnedForumOrFail(
    forumId: string,
    userId: string,
  ): Promise<Forum> {
    const forum = await this.forumRepository.findOne({
      where: { id: forumId },
    });

    if (!forum) {
      throw new NotFoundException("Forum not found");
    }

    if (forum.userId !== userId) {
      throw new ForbiddenException("You are not the owner of this forum");
    }

    return forum;
  }
}
