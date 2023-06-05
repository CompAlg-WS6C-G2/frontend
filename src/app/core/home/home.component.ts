import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  
  first_film : string ="";
  second_film : string = "";
  basePath = 'http://complex-final-lla.azurewebsites.net/';
  data: Array<any> = [];
  data2:Array<any> =[];
  selectedFilm:any;



  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.getData().subscribe((data:any) =>{
      
      this.data = data;
      this.data2 = data;
      this.first_film = this.data[0];
      this.second_film = this.data[1];
      
    });
    
  }

  getData(){
    return this.http.get(`${this.basePath}`);
  }

  change(){
    this.data2 = this.data;
    console.log(this.data2);
    for (let i = 0; i < this.data2.length; i++) {
      if (this.data2[i] === this.first_film) {
        this.data2.splice(i,1);
        console.log(this.data2);
      }
    }
    this.first_film = this.first_film;
  }
}
