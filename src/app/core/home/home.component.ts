import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GraphService } from 'src/app/service/graph.service';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DialogFilmInformationComponent } from '../dialog-film-information/dialog-film-information.component';
import { Observable, ReplaySubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Film } from 'src/app/helper/Film';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: string[] = [];
  dijkstraResults = [];
  dijkstraFilms: Film[] = [];
  // Graph
  dataSource = new FilmDataSource(this.dijkstraFilms);
  activateGraph: boolean = false;
  // Form
  filmControl: FormGroup;
  // Autocomplete
  filteredOptionsFirstFilm: Observable<string[]> | undefined;
  filteredOptionsSecondFilm: Observable<string[]> | undefined;
  // Default values
  displayedColumns: string[] = ['title', 'series_or_movie', 'score', 'actions'];
  typeFilmOptions = [
    { name: 'Both', value: 'both' },
    { name: 'Movie', value: 'Movie' },
    { name: 'Series', value: 'Series' },
  ];
  runtimeOptions = [
    { name: '< 30 minutes', value: 1 },
    { name: '30-60 minutes', value: 2 },
    { name: '1-2 hour', value: 3 },
    { name: '> 2 hour', value: 4 },
  ];
  scoreOptions = [
    { name: '0', value: 0 },
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
  ];

  constructor(
    private graphService: GraphService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.filmControl = this.formBuilder.group({
      first_film: new FormControl({
        updateOn: 'change',
      }),
      second_film: new FormControl({
        updateOn: 'change',
      }),
      type_film: new FormControl('both', {
        updateOn: 'change',
      }),
      runtime: new FormControl(4, {
        updateOn: 'change',
      }),
      score: new FormControl(0, {
        updateOn: 'change',
      }),
    });
  }

  ngOnInit() {
    this.graphService
      .getData()
      .subscribe((data: any) => {
        this.data = data;
        this.filmControl.get('first_film')?.setValue(data[0]);
        this.filmControl.get('second_film')?.setValue(data[1]);
      })
      .add(() => {
        this.filteredOptionsFirstFilm = this.filmControl
          ?.get('first_film')
          ?.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
        this.filteredOptionsSecondFilm = this.filmControl
          ?.get('second_film')
          ?.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
          );
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.data.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  dijkstraAlgorithm() {
    this.activateGraph = false;
    var first = this.filmControl.get('first_film')?.value;
    var second = this.filmControl.get('second_film')?.value;
    var type = this.filmControl.get('type_film')?.value;
    var runtime = this.filmControl.get('runtime')?.value;
    var score = this.filmControl.get('score')?.value;

    if (first === second) {
      alert('Please select two different films.');
      return;
    }

    this.dijkstraFilms = [];

    this.graphService
      .dijkstra(first, second, type, runtime, score)
      .subscribe((data: any) => {
        this.dijkstraResults = data['path'];
        console.log(this.dijkstraResults);
      })
      .add(() => {
        if (this.dijkstraResults.length === 0) {
          alert('No recomendations found, try with other filters or films.');
          return;
        }
        this.findFilms();
      });
  }

  findFilms() {
    for (let i = 0; i < this.dijkstraResults.length; i++) {
      this.graphService
        .getFilm(this.dijkstraResults[i])
        .subscribe((data: any) => {
          var film: Film = {
            title: data['Title'],
            genre: data['Genre'],
            languages: data['Languages'],
            series_or_movie: data['Series or Movie'],
            netflix_link: data['Netflix Link'],
            summary: data['Summary'],
            poster: data['Poster'],
            score: data['IMDb Score'],
          };
          this.dijkstraFilms.push(film);
        })
        .add(() => {
          this.updateTable();
        });
    }
    console.log('Films:', this.dijkstraFilms);
  }

  updateTable() {
    this.dijkstraFilms = [...this.dijkstraFilms];
    this.dataSource.setData(this.dijkstraFilms);
  }

  loadGraph() {
    this.activateGraph = true;
    if (this.dijkstraResults.length === 0) {
      alert('Please select two films first.');
      return;
    }
  }

  openDialog(element: Film) {
    const dialogRef = this.dialog.open(DialogFilmInformationComponent, {
      data: element,
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

class FilmDataSource extends DataSource<Film> {
  private _dataStream = new ReplaySubject<Film[]>();

  constructor(initialData: Film[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Film[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Film[]) {
    this._dataStream.next(data);
  }
}
