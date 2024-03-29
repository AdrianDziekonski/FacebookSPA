import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

user: User;
photoUrl: string;
@ViewChild('editForm', {static: false}) editForm: NgForm;   //odwołanie do formularza edycji
@HostListener('window: beforeunload', ['$event'])           //zabezpiecznie usunięcia nizapisanych danych po zamknieciu karty
unloadNotification($event : any){
if(this.editForm.dirty){
  $event.returnValue=true;
}
}


  constructor(private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
 this.route.data.subscribe(data=>{
   this.user=data.user;
 });
 this.authService.currentPhotoUrl.subscribe(photoUrl=> this.photoUrl=photoUrl);
    }


    updateUser(){

      this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next=>{
        this.alertify.success('Profil pomyślnie zaktualizowany');
        this.editForm.reset(this.user);
      }, error=> {
        this.alertify.error(error);
      });

    }

    updateMainPhoto(photoUrl){
      this.user.photoUrl=photoUrl;
    }
  }





