import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { GraphqlException } from 'src/common/graphql.exception';
import { HashingService } from 'src/common/hashing.service';
import { TokenService } from 'src/common/token.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashingService: HashingService,
        private readonly tokenService: TokenService,
      ) {}

      async register(username: string, email: string, password: string): Promise<User> {
            const existingUser = await this.userRepository.findOne({
                where: [{ username }, { email }],
            });

            if (existingUser) {
                throw new GraphqlException(
                    'Username or email already exists',
                    'CONFLICT',
                    HttpStatus.CONFLICT,
                );
            }

            const hashedPassword = await this.hashingService.hashPassword(password);
    
            const newUser = this.userRepository.create({ username, email, password: hashedPassword });

            try {
                return await this.userRepository.save(newUser);
            } catch (error) {
                throw error;
            }
        
      }

      async login(email: string, password: string): Promise<{ token: string }> {
        

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new GraphqlException(
                'Invalid email or password',
                'UNAUTHORIZED',
                HttpStatus.UNAUTHORIZED,
            );
        }
    
        const isPasswordValid = await this.hashingService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new GraphqlException(
                'Invalid email or password',
                'UNAUTHORIZED',
                HttpStatus.UNAUTHORIZED,
            );
        }
    
        // const payload = { username: user.username, sub: user.id };
        const token = this.tokenService.generateToken(user);
    
        return { token };
      }
}
