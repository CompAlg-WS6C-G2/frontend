import { GraphService } from './../../service/graph.service';
import { Component, OnInit } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph/public_api';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  links: any;
  nodes: any;
  mynodes: Node[] = [];
  mylinks: Edge[] = [];

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.graphService.getNodes().subscribe((data) => {
      this.nodes = data;
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].label = this.nodes[i].id.toString();
      }
      this.mynodes = this.nodes;
      console.log(this.mynodes);
    });

    this.graphService.getLinks().subscribe((data) => {
      this.links = data;
      for (let i = 0; i < this.links.length; i++) {
        // remove weight from links
        delete this.links[i].weight;
      }
      this.mylinks = this.links;
      console.log(this.mylinks);
    });
  }
}
