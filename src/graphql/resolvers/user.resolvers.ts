import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { User } from '../models/user.model';
import { LoginDto, RegisterDto } from 'src/auth/dto/login.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => User)
  async register(
    @Args('registerInput') registerInput: RegisterDto
  ): Promise<User> {
    const {username, email, password} = registerInput;
    return this.authService.register(username, email, password);
  }

  @Mutation(returns => String)
  async login(
    @Args('loginInput') loginInput: LoginDto
  ): Promise<string> {
    const {email, password} = loginInput;
    const { token } = await this.authService.login(email, password);
    return token;
  }
}
