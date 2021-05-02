import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public chartType: string = 'bar';
  public barType: string = 'bar';

  public barLabels: Array<any> = [];
  public barData: Array<any> = [];

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
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
    this.getTotalFromApi();
    console.log(this.barData);
    console.log(this.barLabels);
  }

  async getTotalFromApi() {
    await this.dataService.getTotalStudents().subscribe(data => {
      this.single = data.DBstudentsTotalOutput;
      var auxData = new Array();

      for (let i in this.single){
        this.barLabels.push(this.single[i]["COD_TITULACION"]);
        auxData.push(this.single[i]["COUNT___"]);
      }

      var finalData = { data: auxData, label: 'Titulaciones'};
      this.barData.push(finalData);
    });
  }
}
