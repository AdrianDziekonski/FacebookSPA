import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './nav/nav.component';

import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { UserCardComponent } from './users/userCard/userCard.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { TabsModule } from 'ngx-bootstrap';
import { UserDetailResolver } from './_resolvers/user-datail.resolveer';
import { UserListResolver } from './_resolvers/user-list-resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolveer';

export function tokenGetter(){
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      UserListComponent,
      LikesComponent,
      MessagesComponent,
      UserCardComponent,
      UserDetailComponent,
      UserEditComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
       tokenGetter: tokenGetter,
       whitelistedDomains: ['localhost:5000'],
       blacklistedRoutes: ['locahost:5000/api/auth']
      }
  }),
  RouterModule.forRoot(appRoutes),
  TabsModule.forRoot(),
  NgxGalleryModule,

  [
    BsDropdownModule.forRoot()
  ]
  ],
  providers: [
    AuthService,
    AlertifyService,
    UserService,
    AuthGuard,
    ErrorInterceptorProvider,
    UserDetailResolver,
    UserListResolver,
   // UserEditResolver,
    [
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
      ]

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
