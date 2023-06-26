import { GraphService } from './../../service/graph.service';
import { Component, OnInit, Input } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph/public_api';
import { count } from 'd3';

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
      for (let i = 0; i < this.links.length; i++) {
        var source = this.links[i].source;
        var target = this.links[i].target;
        var arrSource = [];
        var arrTarget = [];
        for (let j = i; j < this.links.length; j++) {
          if (
            this.links[j].source == source ||
            this.links[j].target == source
          ) {
            arrSource.push(this.links[j]);
          }
          if (
            this.links[j].source == target ||
            this.links[j].target == target
          ) {
            arrTarget.push(this.links[j]);
          }
        }
        if (arrSource.length == 3) {
          console.log(arrSource);
          for (let k = 0; k < arrSource.length; k++) {
            if (
              arrSource[k].source == this.films[0] ||
              arrSource[k].source == this.films[this.films.length - 1] ||
              arrSource[k].target == this.films[0] ||
              arrSource[k].target == this.films[this.films.length - 1]
            ) {
              console.log(arrSource[k]);
              var index = this.links.indexOf(arrSource[k]);
              this.links.splice(index, 1);
            }
          }
        }
        if (arrTarget.length == 3) {
          console.log(arrTarget);
          for (let k = 0; k < arrTarget.length; k++) {
            if (
              arrTarget[k].source == this.films[0] ||
              arrTarget[k].source == this.films[this.films.length - 1] ||
              arrTarget[k].target == this.films[0] ||
              arrTarget[k].target == this.films[this.films.length - 1]
            ) {
              console.log(arrTarget[k]);
              var index = this.links.indexOf(arrTarget[k]);
              this.links.splice(index, 1);
            }
          }
        }
      }
      this.mylinks = this.links;
      console.log(this.links);
    });
  }
}
