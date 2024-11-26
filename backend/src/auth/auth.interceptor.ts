import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request=context.switchToHttp().getRequest();
    const token=request.headers['authorization']

    if(token !== 'Bearer valid_token'){
      throw new UnauthorizedException('Unauthorized')
    }
    return next.handle();
  }
}
