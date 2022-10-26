import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/config/configuration';
import { User } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { Web3Module } from '../web3/web3.module';
import { Web3Service } from '../web3/web3.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: '30 days' },
    }),
    PassportModule,
    UserModule,
    Web3Module,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    Web3Service,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
