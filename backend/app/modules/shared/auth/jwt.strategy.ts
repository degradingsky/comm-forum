import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload } from "./model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `https://dev-mvjokkmjifwa50li.us.auth0.com/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      aud: "https://dev-mvjokkmjifwa50li.us.auth0.com/api/v2/",
      algorithms: ["RS256"],
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
