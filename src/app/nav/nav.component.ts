import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  model: any={};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(){
this.authService.login(this.model).subscribe(next=>{
  this.alertify.success('zalogwałeś się do aplikacji');
},  error=>{
  this.alertify.error(error);
}, ()=>{
  this.router.navigate(['/znajomi'])  //przekierowanie do strony po zalogowaniu w funkcji anonimowej
}
);
  }
//sprawdzenie czy zalogowany
  loggedIn(){
    return this.authService.loggedIn();
    // const token=localStorage.getItem('token');
    // return !!token; //jest token to true a nie to false !! to skrót
  }
    loggedOut(){
localStorage.removeItem('token');
localStorage.removeItem('user');
this.authService.currentUser=null;
this.authService.decodedToken=null;
this.alertify.message('zostałeś wylogowany');
this.router.navigate(['/home'])
    }
  }

