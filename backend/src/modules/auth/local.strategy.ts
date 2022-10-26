import { Strategy as BaseLocalStrategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/entity/user.entity';

export type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  //@description usernameとpasswordを使った認証処理を行うクラス
  //UseGuards(AuthGuard('local'))でmiddlerwareのように認証を行うことが可能

  async validate(
    name: User['username'],
    pass: User['password'],
  ): Promise<PasswordOmitUser> {
    const user = await this.authService.validateUser(name, pass);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
