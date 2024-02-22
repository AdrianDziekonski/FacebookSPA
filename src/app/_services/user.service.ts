import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/Message';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginationResult<User[]>> {

const paginationResult: PaginationResult<User[]>=new PaginationResult<User[]>();
let params= new HttpParams();

if(page != null && itemsPerPage != null){
  params=params.append('pageNumber', page);
  params= params.append('pageSize', itemsPerPage);
}

if(userParams !=null){
  params=params.append('minAge', userParams.minAge);
  params=params.append('maxAge', userParams.maxAge);
  params=params.append('orderBy', userParams.orderBy);
}

if(likesParam==='UserLikes'){
  params=params.append('UserLikes', 'true');
}

if(likesParam==='UserIsLiked'){
  params=params.append('UserIsLiked', 'true');
}

    return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params})
    .pipe(
      map(response=>{
        paginationResult.result = response.body;

        if(response.headers.get('Pagination') != null){
          paginationResult.pagination=JSON.parse(response.headers.get('Pagination'))
        }
        return paginationResult;
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id)
  }


updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'users/' + id, user);

}

setMainPhoto(userId: number, id: number){
return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {})
}

deletePhoto(userId: number, id: number){
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}

sendLike(id: number, recipientId: number){
  return this.http.post(this.baseUrl+ 'users/' + id + '/like/' + recipientId, {});
}



getMessages(id: number, page?,itemsPerPage?, messageContainer?){
  const paginationResult: PaginationResult<Message[]>=new PaginationResult<Message[]>();
let params= new HttpParams();

params=params.append('MessageContainer', messageContainer);

if(page != null && itemsPerPage != null){
  params=params.append('pageNumber', page);
  params= params.append('pageSize', itemsPerPage);
}

//jak nie zadzaiła to w adrresie może być błąd "messeges" zamiast "messages"
return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messeges', {observe: 'response', params})
.pipe(
  map(response=>{
    paginationResult.result = response.body;

    if(response.headers.get('Pagination') != null){
      paginationResult.pagination=JSON.parse(response.headers.get('Pagination'))
    }
    return paginationResult;
  })
);

}

//jak nie zadzaiła to w adrresie może być błąd "messeges" zamiast "messages"
getMessageThread(id: number, recipientId: number){
  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messeges/thread/' + recipientId)
}

sendMessage(id:number, message: Message){
  return this.http.post(this.baseUrl+ 'users/' + id + '/messeges/', message);
}

deleteMessage(id: number, userId: number){
  return this.http.post(this.baseUrl + 'users/' + userId + '/messeges/' + id,{});

}

markAsRead(userId:  number, messageId: number){
  this.http.post(this.baseUrl + 'users/' + userId + '/messeges/' + messageId + '/read', {}).subscribe();
}

}
