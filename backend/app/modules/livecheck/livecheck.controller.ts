import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  VERSION_NEUTRAL,
} from "@nestjs/common";

import { Public } from "../../guards/auth.guard";

@Controller({
  version: VERSION_NEUTRAL,
  path: "livecheck",
})
@Public()
export class LivecheckController {
  @Get()
  @HttpCode(HttpStatus.OK)
  livecheck() {
    return {
      status: "ok",
    };
  }
}
