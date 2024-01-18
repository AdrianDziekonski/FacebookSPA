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

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login(){
this.authService.login(this.model).subscribe(next=>{
  this.alertify.success('zalogwałeś się do aplikacji');
},  error=>{
  this.alertify.error('wystąpił błąd logowania');
}, ()=>{
  this.router.navigate(['/znajomi'])  //przekierowanie do strony po zalogowaniu w funkcji anonimowej
}
);
  }
//sprawdzenie czy zalogowany
  loggedIn(){
    const token=localStorage.getItem('token');
    return !!token; //jest token to true a nie to false !! to skrót
  }
    loggedOut(){
localStorage.removeItem('token');
this.alertify.message('zostałeś wylogowany');
this.router.navigate(['/home'])
    }
  }

