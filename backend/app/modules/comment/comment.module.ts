import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; // Import TypeOrmModule
import { CommentService } from "./comment.service";
import { Comment } from "./comment.entity";
import { CommentController } from "./comment.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
