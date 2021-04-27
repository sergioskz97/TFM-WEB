import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  url1 = "http://localhost:7101/ull-alumno/getStudentsTotal";
  view: [number, number] = [700, 400];
  single: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Titulaciones';
  showYAxisLabel = true;
  yAxisLabel = 'Número de alumnos';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private dataService: APIService) {

  }

  ngOnInit(): void {
    this.getTotalFromApi();
  }

  onSelect(event: any) {
    console.log(event);
  }

  async getTotalFromApi(){
    await this.dataService.getTotalStudents().subscribe(data => {
      this.single = data.DBstudentsTotalOutput;
      console.log(this.single)
    });
  }

}
