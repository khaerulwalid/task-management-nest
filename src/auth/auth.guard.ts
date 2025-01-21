import { HttpStatus, Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { GraphqlException } from 'src/common/graphql.exception';
import { CustomRequest } from 'src/common/interface/request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const authHeader = gqlContext.req.headers['authorization'];
    console.log(authHeader, "<<authHeader");

    if (!authHeader) {
      throw new GraphqlException(
        'Token not provided',
        'NotFoundException',
        HttpStatus.NOT_FOUND,
      );
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log(decoded, "<<decoded");
      
      gqlContext.req.user = {
        id: decoded.sub,
        username: decoded.username,
      };
      return true;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
