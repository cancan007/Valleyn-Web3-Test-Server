import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt = require('bcrypt');

export interface JwtPAYload {
  username: User['username'];
  id: User['id'];
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(User)
    private readonly userRepositry: Repository<User>,
  ) {}

  async validateUser(username: User['username'], pass: User['password']) {
    const user = await this.userRepositry.findOne({ where: { username } });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateJwtToken(user: Omit<User, 'password'>) {
    const payload: JwtPAYload = { username: user.username, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
