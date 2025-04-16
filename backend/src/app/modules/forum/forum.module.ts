import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"; // Import TypeOrmModule

import { ForumController } from "./forum.controller"; // Import the ForumController
import { Forum } from "./forum.entity"; // Import the Forum entity
import { ForumService } from "./forum.service"; // Import the ForumService

@Module({
  imports: [TypeOrmModule.forFeature([Forum])], // Register Forum entity with TypeORM
  providers: [ForumService], // Add ForumService as a provider
  controllers: [ForumController], // Register ForumController to handle routes
})
export class ForumModule {}
