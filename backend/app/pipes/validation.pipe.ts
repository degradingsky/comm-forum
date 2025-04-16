import { Injectable } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  }
}
