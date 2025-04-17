import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";

import { AppController } from "./app.controller";
import { ForumModule } from "./forum/forum.module";
import { LivecheckModule } from "./livecheck/livecheck.module";
import { AuthModule } from "./shared/auth/auth.module";
import { DatabaseModule } from "./shared/database/database.module";
import { CommentModule } from "./comment/comment.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LivecheckModule,
    LoggerModule.forRoot(),
    AuthModule,
    DatabaseModule,
    ForumModule,
    CommentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
