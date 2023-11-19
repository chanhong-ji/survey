import {
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { TypeORMError } from 'typeorm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    switch (true) {
      case exception instanceof HttpException:
        throw exception;

      case exception instanceof TypeORMError:
        throw new InternalServerErrorException('Typeorm error');

      default:
        throw new InternalServerErrorException('Unexpected error');
    }
  }
}
