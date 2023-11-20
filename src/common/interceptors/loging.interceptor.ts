import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger('Error Logger');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        // next: (val: unknown): void => {
        //   this.logNext(val, context);
        // },
        error: (err: Error): void => {
          this.logError(err, context);
        },
      }),
    );
  }

  // private logNext(body: unknown, context: ExecutionContext): void {
  // }

  private logError(error: Error, context: ExecutionContext): void {
    if (error instanceof HttpException) {
      const statusCode: number = error.getStatus();
      const message: string = `Outgoing response - ${statusCode} - ${error.message}`;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(
          {
            message,
            error,
          },
          error.stack,
        );
      } else {
        this.logger.warn({
          message,
          error,
        });
        error.stack;
      }
    } else {
      this.logger.error({ message: error.message }, error.stack);
    }
  }
}
