import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class UserEditResolver implements Resolve<User>{

  constructor (private userService: UserService,
   private router:Router,
   private alertify: AlertifyService, private authService: AuthService) {}


   resolve(route: ActivatedRouteSnapshot):  Observable<User>  {
    return this.userService.getUser(this.authService.decodedToken).pipe(
      catchError(error=>{
      this.alertify.error('Problem z pobraniem danych(Edit Resolver)');
      this.router.navigate(['/znajomi']);
      return of(null);
    }));
  }

}

//rozwiązuje problem gdyby nie było danych uzytkwnika, mozna tez uzywac {{user?.costam}} zeby nie było błędów w przeglądarce
