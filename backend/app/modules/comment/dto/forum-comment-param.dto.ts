import { IsUUID } from "class-validator";

export class ForumCommentParamDTO {
    @IsUUID()
    forumId: string;

    @IsUUID()
    commentId: string;
}