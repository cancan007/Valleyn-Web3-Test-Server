import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/config/configuration';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Web3Module } from '../web3/web3.module';
import { Web3Service } from '../web3/web3.service';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
    }),
    Web3Module,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, Web3Service, JwtAuthGuard],
})
export class UserModule {}
