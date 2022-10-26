import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Web3Service } from '../web3/web3.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly web3Service: Web3Service,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { username, email, password } = user;
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
    const { userId } = await this.web3Service.createUser(username);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = { username, email, id: userId, password: passwordHash };
    const { password: pass, ...result } = await this.userRepository.save(
      newUser,
    );
    return result;
  }
}
