import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  user: User= JSON.parse(localStorage.getItem('user'));
  userParams : any={};
  pagination: Pagination;


  constructor(private UserService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.userParams.minAge=15;
    this.userParams.maxAge=100;
    this.userParams.orderBy='Username';
  }

  resetFilters(){
    this.userParams.minAge=15;
    this.userParams.maxAge=100;
    this.userParams.orderBy='Username';
    this.loadUsers();
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }


  loadUsers(){
    this.UserService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginationResult<User[]>)=>{
       this.users=res.result;
       this.pagination=res.pagination;
     }, error=>{
       this.alertify.error(error);
     });
 }
}

