import { Controller, Get, Redirect, VERSION_NEUTRAL } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

import { Public } from "../guards/auth.guard";

@Controller({
  version: VERSION_NEUTRAL,
  path: "/",
})
@Public()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  @Redirect("/swagger")
  redirectToSwagger() {}
}
