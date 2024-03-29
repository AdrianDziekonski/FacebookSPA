import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';


//dekorator pozwala wstrzykiwać do serwisu
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl=environment.apiUrl +'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl=new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl=this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

changeUserPhoto(photoUrl: string){
this.photoUrl.next(photoUrl);
}


login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
    .pipe(map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
       localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);

        this.currentUser = user.user;
        this.changeUserPhoto(this.currentUser.photoUrl);
      }
    }));
}

register(user: User){
  return this.http.post(this.baseUrl + 'register', user);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
