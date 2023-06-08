import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('/api');
  }

  getNodes() {
    return this.http.get('/api/nodes');
  }

  getLinks() {
    return this.http.get('/api/links');
  }

  dijkstra(start: string, end: string) {
    return this.http.get(
      `/api/dijkstra/${encodeURIComponent(start)}/${encodeURIComponent(end)}`
    );
  }

  getFilm(film: string) {
    return this.http.get(`/api/mongodb_nodes/${encodeURIComponent(film)}`);
  }
}
