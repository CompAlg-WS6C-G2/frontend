import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:5000';

  getNodes() {
    return this.http.get(`${this.url}/nodes`);
  }

  getLinks() {
    return this.http.get(`${this.url}/links`);
  }
}
