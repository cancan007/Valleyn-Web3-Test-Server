import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PasswordOmitUser } from './local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: PasswordOmitUser }) {
    const user = req.user;
    const { access_token } = this.authService.generateJwtToken(user);
    return { ...user, access_token };
  }
}
