// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { UsersService } from 'src/users/users.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor (private usersService:UsersService){}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request=context.switchToHttp().getRequest();
//     const  {name,email}=request.body;
//     return this.usersService.validateUser(name,email);
//   }
// }
