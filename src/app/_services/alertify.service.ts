import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({providedIn: 'root'})
export class AlertifyService {

constructor() { }

success(message: string){
  alertify.success(message);
}

error(message: string){
  alertify.error(message);
}
warning(message: string){
  alertify.warning(message);
}

message(message: string){
  alertify.message(message);
}

confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, (e) => {
    if (e) {
      okCallback();
    } else {}
  });
}

}

//Service to szeroka kategoria obejmująca dowolną wartość, funkcję lub cechę potrzebną aplikacji. Usługa to zazwyczaj klasa o wąskim, dobrze zdefiniowanym celu. Powinien robić coś konkretnego i robić to dobrze.


