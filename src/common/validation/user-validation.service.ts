import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { GraphqlException } from 'src/common/graphql.exception';

@Injectable()
export class UserValidationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUserExists(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new GraphqlException(
        'User not found',
        'BadRequestException',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
