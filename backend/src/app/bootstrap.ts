import { INestApplication, VersioningType } from "@nestjs/common";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";

import { JwtAuthGuard } from "./guards/auth.guard";
import { CustomValidationPipe } from "./pipes/validation.pipe";
import { setUpSwagger } from "./swagger";

export default function bootstrap(app: INestApplication) {
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalGuards(app.get(JwtAuthGuard));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  setUpSwagger(app);
}
