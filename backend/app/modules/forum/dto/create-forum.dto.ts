import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateForumDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
