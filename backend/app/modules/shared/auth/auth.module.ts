import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { JwtAuthGuard } from "../../../guards/auth.guard";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule.register({
      global: true,
      defaultStrategy: "jwt",
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
