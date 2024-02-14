import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class LikesResolver implements Resolve<User[]>{

  pageNumber=1;
  pageSize=36;   //tu można ustawić lu uzytkowników wyswietla na stronie
  likesParam='UserLikes';

  constructor (private userService: UserService,
    private route:ActivatedRoute,private router:Router,
   private alertify: AlertifyService) {}


   resolve(route: ActivatedRouteSnapshot):  Observable<User[]>  {
    return this.userService.getUsers(this.pageNumber,this.pageSize, null, this.likesParam).pipe(
      catchError(error=>{
      this.alertify.error('Problem z pobraniem danych');
      this.router.navigate(['']);
      return of(null);
    }));
  }

}
