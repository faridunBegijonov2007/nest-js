import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ControllerResponse } from '../types';

@Injectable()
export class TransformInterceptor<T = any> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const response: { statusCode: number } = ctx.getResponse();

    return next.handle().pipe(
      map((data: ControllerResponse<T> | T): ApiResponse<T> => {
        let payload: T;
        let message: string;

        if (
          (data as ControllerResponse<T>).payload !== undefined ||
          (data as ControllerResponse<T>).message !== undefined
        ) {
          const ctrlData = data as ControllerResponse<T>;
          payload = ctrlData.payload as T;
          message = ctrlData.message || 'OK';
        } else {
          payload = data as T;
          message = 'OK';
        }

        return {
          code: response.statusCode,
          message,
          payload: payload,
        };
      })
    );
  }
}
