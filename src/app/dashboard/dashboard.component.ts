import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  url1 = "http://localhost:7101/ull-alumno/getStudentsTotal";
  view: any[] = [700, 400];
  single: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private http: HttpClient) { 
    this.http.get(this.url1).subscribe(data => {
      this.single = JSON.parse(JSON.stringify(data));
    })
  }

  ngOnInit(): void {
    Object.assign(this.single)
  }

  onSelect(event: any) {
    console.log(event);
  }

}
