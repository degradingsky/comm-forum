import { Module } from "@nestjs/common";

import { LivecheckController } from "./livecheck.controller";

@Module({
  controllers: [LivecheckController],
})
export class LivecheckModule {}
