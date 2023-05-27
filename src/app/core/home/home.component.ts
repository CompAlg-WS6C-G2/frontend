import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data = ['Angular', 'React', 'Vue'];
  first_film = 'Angular';
  second_film = 'React';
}
