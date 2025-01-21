import { HttpException, HttpStatus } from '@nestjs/common';

export class GraphqlException extends HttpException {
    constructor(message: string, code: string, status: HttpStatus) {
        super({ message, code }, status);
    }
}
