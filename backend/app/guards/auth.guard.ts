import {
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isUnauthenticatedRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isUnauthenticatedRoute) {
      return true;
    }
    await super.canActivate(context);
    this.extractAndSetBearerToken(request);
    return true;
  }
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException("Invalid auth token");
    }
    return user;
  }

  private extractAndSetBearerToken(request: any): string | null {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (token) {
      request.userToken = token;
    }
    return token;
  }
}
