import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GraphService } from 'src/app/service/graph.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: string[] = [];
  selectedFilm: any;
  dijkstra_results = [];
  dijkstra_films: Film[] = [];
  dataSource = new FilmDataSource(this.dijkstra_films);
  displayedColumns: string[] = ['title', 'series_or_movie', 'score'];
  activateGraph: boolean = false;
  filmControl: FormGroup;
  filteredOptionsFirstFilm: Observable<string[]> | undefined;
  filteredOptionsSecondFilm: Observable<string[]> | undefined;

  constructor(
    private graphService: GraphService,
    private formBuilder: FormBuilder
  ) {
    this.filmControl = this.formBuilder.group({
      first_film: new FormControl(
        { validators: [Validators.required] },
        { updateOn: 'change' }
      ),
      second_film: new FormControl(
        { validators: [Validators.required] },
        { updateOn: 'change' }
      ),
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

    if (first === second) {
      alert('Please select two different films.');
      return;
    }

    this.dijkstra_films = [];

    this.graphService
      .dijkstra(first, second)
      .subscribe((data: any) => {
        this.dijkstra_results = data['path'];
        console.log(this.dijkstra_results);
      })
      .add(() => {
        this.findFilms();
      });
  }

  findFilms() {
    for (let i = 0; i < this.dijkstra_results.length; i++) {
      this.graphService
        .getFilm(this.dijkstra_results[i])
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
          this.dijkstra_films.push(film);
        })
        .add(() => {
          this.updateTable();
        });
    }
    console.log('Films:', this.dijkstra_films);
  }

  updateTable() {
    this.dijkstra_films = [...this.dijkstra_films];
    this.dataSource.setData(this.dijkstra_films);
  }

  loadGraph() {
    this.activateGraph = true;
    if (this.dijkstra_results.length === 0) {
      alert('Please select two films first.');
      return;
    }
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

export interface Film {
  title: string;
  genre: string[];
  languages: string[];
  series_or_movie: string;
  netflix_link: string;
  summary: string;
  poster: string;
  score: number;
}
