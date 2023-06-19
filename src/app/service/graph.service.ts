import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://complex-final-lla.azurewebsites.net/';

  getData() {
    return this.http.get(this.baseUrl);
  }

  getLinks() {
    return this.http.get(this.baseUrl + 'links');
  }

  dijkstra(
    start: string,
    end: string,
    typefilm = 'both',
    runtime = 4,
    score = 0
  ) {
    return this.http.get(
      this.baseUrl +
        `dijkstra/${encodeURIComponent(start)}/${encodeURIComponent(
          end
        )}/${typefilm}/${runtime}/${score}`
    );
  }

  getFilm(film: string) {
    return this.http.get(this.baseUrl + `data/${encodeURIComponent(film)}`);
  }
}
