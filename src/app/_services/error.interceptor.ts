//import { ErrorInterceptor } from './error.interceptor';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error=>{
        if (error instanceof HttpErrorResponse){
          const applicationError=error.headers.get('Application-Error');

          if (applicationError){
            console.error(applicationError);
            return throwError (applicationError);
          }

          const serverError=error.error;
          let errors='';

          if (serverError && typeof serverError==='object'){
            for(const key in serverError){
              if (serverError[key]) {
                errors+=serverError[key] + '\n';
              }
            }
          }
          return throwError(errors || serverError || 'Server Error');
        }
      })
    );
  }

}

export const ErrorInterceptorProvider={
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
