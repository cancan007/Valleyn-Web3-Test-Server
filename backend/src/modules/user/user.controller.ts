import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<any> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }
}
