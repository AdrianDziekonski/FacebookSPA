import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-userCard',
  templateUrl: './userCard.component.html',
  styleUrls: ['./userCard.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService ) { }

  ngOnInit() {
  }

  sendLike(id: number){
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data=>{
      this.alertify.success('Lubisz ' + this.user.username.toUpperCase());
    },error=>{
      this.alertify.error(error);
    });
  }

}
