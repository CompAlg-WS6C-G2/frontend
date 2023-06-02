import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {}

  getNodes() {
    return this.http.get('/api/nodes');
  }

  getLinks() {
    return this.http.get('/api/links');
  }
}
