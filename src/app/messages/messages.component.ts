import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/Message';
import { Pagination, PaginationResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer='Nieprzeczytane';
  flagaOutbox= false;

  constructor(private userService: UserService,
    private router: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.data.subscribe(data=>{
      this.messages= data.messages.result;
      this.pagination=data.messages.pagination;
    });
  }

  loadMessages(){
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer).subscribe((res: PaginationResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;

      if(res.result[0].messageContainer ==='Outbox')
      {
        this.flagaOutbox=true;
      }
      else {
        this.flagaOutbox=false;
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteMessage(id: number){
    this.alertify.confirm('Czy na pewno chcesz usunąć wiadomość?',()=>{
      this.userService.deleteMessage(id,this.authService.decodedToken.nameid).subscribe(()=>{
        this.messages.splice(this.messages.findIndex(m=>m.id===id, 1));
        this.alertify.success('Wiadomość została usunięta');
      }, error=>{
        this.alertify.error('Nie udało się usunąć wiadomości');
    });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
