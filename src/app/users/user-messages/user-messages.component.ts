import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/Message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { tap } from 'rxjs/operators';
//import { error } from 'console';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.scss']
})
export class UserMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any={};

  constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  // loadMessages(){
  //   const currentUserId=this.authService.decodedToken.nameid;
  //   this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId).pipe(tap(messages=>{
  //     for (let i =0; i < messages.length; i++) {
  //       if(messages[i].isRead===false && messages[i].recipientId=== currentUserId ){
  //       this.userService.markAsRead(currentUserId, messages[i].id);
  //       }
  //     }
  //   })).subscribe(messages=>{
  //         this.messages=messages;
  //     },error=>{
  //       this.alertify.error(error);

  //   });
  // }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, messages[i].id);
          }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage(){
this.newMessage.recipientId= this.recipientId;
this.userService.sendMessage(this.authService.decodedToken.nameid,this.newMessage).subscribe((message:Message)=>{
  this.messages.unshift(message);
  this.newMessage.content='';
},error=>{
  this.alertify.error(error);
});
  }


}
