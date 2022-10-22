import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(user: CreateUserDto) {
    const { username, email } = user;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    const existEmail = await this.userRepository.findOne({ where: { email } });
    if (existUser || existEmail) {
      throw new HttpException(
        'username or email is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}
