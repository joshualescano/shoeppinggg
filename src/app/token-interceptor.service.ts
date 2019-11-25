import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { AuthGuardService} from './auth-guard.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req,next){ 
    let authGuardService = this.injector.get(AuthGuardService)

    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authGuardService.getToken()}`
      }
    }) 
    return next.handle(tokenizedReq)
  }
}
