import { Routes} from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { UserListComponent } from "./users/user-list/user-list.component";
import { LikesComponent } from "./likes/likes.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { UserDetailResolver } from "./_resolvers/user-datail.resolveer";
import { UserListResolver } from "./_resolvers/user-list-resolver";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserEditResolver } from "./_resolvers/user-edit.resolveer";
import { PreventUnsavesChanges } from './_guards/prevent-unsaved-changes.guard';
import { LikesResolver } from './_resolvers/likeResolvers';


export const appRoutes: Routes=[
  {path: '', component: HomeComponent},
  {path:'',
runGuardsAndResolvers:'always',
canActivate: [AuthGuard],
children:[
  {path: 'znajomi', component: UserListComponent,resolve: {users:UserListResolver}}, //auth guard zabezpieczenie routingu (w folderze app jest)
  {path: 'znajomi/:id', component: UserDetailComponent, resolve: {user:UserDetailResolver}},
  {path: 'uzytkownik/edycja', component: UserEditComponent, resolve: {user:UserEditResolver, //canDeactivate: [PreventUnsavesChanges]}}, jakis problem z tym zabezpieczniem- narzie odpuszcone
}}, {path: 'statusy', component: LikesComponent, resolve: {users: LikesResolver}},
  {path: 'wiadomosci', component: MessagesComponent},

]
},

  {path: '**', redirectTo: '',pathMatch: 'full'}

];


