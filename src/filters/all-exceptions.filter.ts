import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { GraphqlException } from 'src/common/graphql.exception';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    if (exception instanceof GraphqlException) {
        const response = exception.getResponse() as any;
        const status = exception.getStatus();
    
        return new GraphQLError(response.message || 'Internal server error', {
            extensions: {
                code: response.code || 'INTERNAL_SERVER_ERROR',
                status,
                response,
            },
        });
    }
    
    if (exception instanceof HttpException) {
        const response = exception.getResponse() as any;
        const status = exception.getStatus();
    
        return new GraphQLError(response.message || 'Internal server error', {
            extensions: {
                code: 'HTTP_EXCEPTION',
                status,
                response,
            },
        });
    }
  }
}
