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

  getNodes() {
    return this.http.get(this.baseUrl + 'nodes');
 }

  getLinks() {
    return this.http.get(this.baseUrl + 'links');
  }

  dijkstra(start: string, end: string) {
    return this.http.get(
      this.baseUrl + `dijkstra/${encodeURIComponent(start)}/${encodeURIComponent(end)}`
    );
  }

  getFilm(film: string) {
    return this.http.get(`/api/mongodb_nodes/${encodeURIComponent(film)}`);
  }
}
