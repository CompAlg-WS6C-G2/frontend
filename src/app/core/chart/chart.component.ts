import { GraphService } from './../../service/graph.service';
import { Component, OnInit, Input } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph/public_api';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() films: any = [];

  links: any = [];
  nodes: any = [];
  mynodes: Node[] = [];
  mylinks: Edge[] = [];

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    console.log('Loading graph');

    for (let i = 0; i < this.films.length; i++) {
      this.nodes.push({ id: this.films[i], label: this.films[i] });
    }

    this.mynodes = this.nodes;

    this.graphService.getLinks().subscribe((data) => {
      var temp_links: any = data;
      for (let i = 0; i < temp_links.length; i++) {
        if (
          this.films.includes(temp_links[i].source) &&
          this.films.includes(temp_links[i].target)
        ) {
          this.links.push({
            source: temp_links[i].source,
            target: temp_links[i].target,
          });
        }
      }
      this.mylinks = this.links;
      console.log(this.links);
    });
  }
}
