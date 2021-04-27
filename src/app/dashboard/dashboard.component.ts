import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import * as chartJS from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  single: any[] = [];
  barChartOptions: chartJS.ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: chartJS.ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: chartJS.ChartDataset[] = [
    { data: this.single }
  ];

  constructor(private dataService: APIService) {

  }

  ngOnInit(): void {
    this.getTotalFromApi();
  }

  async getTotalFromApi(){
    await this.dataService.getTotalStudents().subscribe(data => {
      this.single = data.DBstudentsTotalOutput;
      console.log(this.single)
    });
  }

}
