import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from 'src/graphql/resolvers/user.resolvers';
import { UserValidationService } from 'src/common/validation/user-validation.service';
import { HashingService } from 'src/common/hashing.service';
import { TokenService } from 'src/common/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    })
  ],
  providers: [AuthService, AuthResolver, UserValidationService, HashingService, TokenService],
  exports: [AuthService, UserValidationService]
})
export class AuthModule {}
