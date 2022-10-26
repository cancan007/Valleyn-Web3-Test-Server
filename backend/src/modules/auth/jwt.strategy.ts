// import先が'passport-local'では無い事に注意！
import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPAYload } from './auth.service';
import { User } from '../user/entity/user.entity';
import { configuration } from 'src/config/configuration';

// @description JWTの認証処理を行うクラス

@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor() {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // envファイルから秘密鍵を渡す
      secretOrKey: configuration().jwt.secret,
    });
  }

  async validate(payload: JwtPAYload): Promise<JwtPAYload> {
    return { username: payload.username, id: payload.id };
  }
}
