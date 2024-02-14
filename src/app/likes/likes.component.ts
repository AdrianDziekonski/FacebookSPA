import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Pagination, PaginationResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private userService: UserService, private alertify: AlertifyService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.users=data.users.result;
      this.pagination=data.users.pagination;
    });
    this.likesParam='UserLikes'
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe((res: PaginationResult<User[]>)=>{
       this.users=res.result;
       this.pagination=res.pagination;
     }, error=>{
       this.alertify.error(error);
     });
 }

 pageChanged(event: any): void {
  this.pagination.currentPage = event.page;
  this.loadUsers();
}


}
