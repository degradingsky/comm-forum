import { IsUUID } from "class-validator";

export class ForumParamDTO {
  @IsUUID()
  forumId: string;
}
