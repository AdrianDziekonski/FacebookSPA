import { Component, OnInit } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
//import { error } from 'console';

@Component({
  selector: 'app-valueNG',
  templateUrl: './valueNG.component.html',
  styleUrls: ['./valueNG.component.scss']
})
export class ValueNGComponent implements OnInit {

  values: any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

getValues(){
  this.http.get('http://localhost:5000/api/values').subscribe(response =>{
    this.values=response;
  },error=>{
    console.log(error);
  });
}

}
