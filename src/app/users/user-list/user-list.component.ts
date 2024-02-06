import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private UserService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.users=data.users;
    });
  }

  // loadUsers(){
  //   this.UserService.getUsers().subscribe((users: User[])=>{
  //     this.users=users;
  //   }, error=>{
  //     this.alertify.error(error);
  //   })
 //}
}
