import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public chartType: string = 'bar';
  public barType: string = 'bar';

  /*public barLabels: Array<any> = [];
  public barData: Array<any> = [];*/

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  single: any[] = [];

  constructor(private dataService: APIService) {

  }

  ngOnInit(): void {

    // Total students bar chart
    this.dataService.getTotalStudents().subscribe(res => {
      let aux = res.DBstudentsTotalOutput;
      let auxData = new Array();
      let barLabels = new Array;
      let barData = new Array;

      for (let i in aux) {
        barLabels.push(aux[i]["COD_TITULACION"]);
        auxData.push(aux[i]["COUNT___"]);
      }

      barData.push({ data: auxData, label: 'Titulaciones', backgroundColor: 'rgba(0, 137, 132, .2)', borderColor: 'rgba(200, 99, 132, .7)', borderWidth: 2 });

      new Chart('barChart', {
        type: 'bar',
        data: {
          labels: barLabels,
          datasets: barData
        },
        options: {
          legend: { display: true },
          title: {
            display: false,
            text: 'Total de egresados por titulacion'
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true 
              }
            }]
          }
        }
      });
    });
  }
}
