import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {lstSatisticType} from '../../constants/Constants';
import {ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color} from 'ng2-charts';
import {SatisticalService} from '../../service/satistical.service';

@Component({
  selector: 'app-satistic',
  templateUrl: './satistic.component.html',
  styleUrls: ['./satistic.component.scss']
})
export class SatisticComponent implements OnInit {
  searchForm: FormGroup;
  lstSatisticType = lstSatisticType;
  isTypeChart: number;
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public chartLegend = true;
  public chartPlugins = [];
  // pie
  public chartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: Array<any> = [{
    backgroundColor: ['red', 'yellow', 'rgba(148,159,177,0.2)'],
    borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
  }];
  // bar
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataSets[] = [];
  public barChartColors: Color[] = [
    {backgroundColor: 'red'},
    {backgroundColor: 'green'},
  ];
  // line
  public lineChartData: ChartDataSets[] = [];
  public lineChartType = 'line';
  public lineChartColors: Color[] = [{
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    }];

  constructor(private apiService: SatisticalService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      type: new FormControl(1),
    });
    this.isTypeChart = this.searchForm.value.type;
    this.search();
  }

  search() {
    this.isTypeChart = this.searchForm.value.type;
    if (this.searchForm.value.type === 1) {
      this.apiService.satisticByGroup()
      .toPromise().then(rs => {
        this.chartLabels = rs.map(item => item.name);
        this.pieChartData = rs.map(item => item.total);
      });
    } else if (this.searchForm.value.type === 2) {
      this.apiService.satisticByBrand()
      .subscribe(rs => {
        this.chartLabels = rs.map(item => item.name);
        this.barChartData = [
          {data: rs.map(item => item.totalMoney), label: 'Money'},
          {data: rs.map(item => item.totalQuantity), label: 'Quantity'}
        ];
        console.log(this.chartLabels, this.barChartData);
      });
    } else if (this.searchForm.value.type === 3) {
      this.apiService.satisticByMonth()
      .subscribe(rs => {
        this.chartLabels = rs.map(item => `${item.month}`);
        this.lineChartData = [
          {data: rs.map(item => item.total), label: 'Money'},
        ];
      });
    }
  }

}
