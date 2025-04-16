import { JwtPayload } from "app/modules/shared/auth/model";

export interface CustomRequest {
  user: JwtPayload;
  [key: string]: any;
}
