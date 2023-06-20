import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Film } from 'src/app/helper/Film';

@Component({
  selector: 'app-dialog-film-information',
  templateUrl: './dialog-film-information.component.html',
  styleUrls: ['./dialog-film-information.component.css'],
})
export class DialogFilmInformationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Film) {}
}
