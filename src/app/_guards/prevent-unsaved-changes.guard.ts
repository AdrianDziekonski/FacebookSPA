import { CanDeactivate, CanActivate } from '@angular/router';
import { UserEditComponent } from '../users/user-edit/user-edit.component';


//zabezpieczenie przed zniknieceim nie zapianych zmian

export class PreventUnsavesChanges implements CanDeactivate<UserEditComponent> {
  canDeactivate(component: UserEditComponent ){
if(component.editForm.dirty) {
  return confirm('Czy jesteś pewnien, że chcesz opuścić proces? Wszelkie niezapisane zmiany zostaną utracone');
}
return true;
  }
}
