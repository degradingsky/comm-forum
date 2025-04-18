export type JwtPayload = {
  iss?: string;
  sub: string;
  aud: string[];
  iat?: number;
  exp: number;
  scope?: string;
  azp: string;
  name?: string
};
