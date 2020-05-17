import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {lstSatisticType} from '../../constants/Constants';
import {ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, BaseChartDirective, Color} from 'ng2-charts';
import {SatisticalService} from '../../service/satistical.service';

@Component({
  selector: 'app-satistic',
  templateUrl: './satistic.component.html',
  styleUrls: ['./satistic.component.scss']
})
export class SatisticComponent implements OnInit, AfterViewInit {
  searchForm: FormGroup;
  lstSatisticType = lstSatisticType;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public lineChartData: ChartDataSets[] = [
    { data: [0, 10600, 0, 0, 76400, 0, 0, 0, 0, 0, 0], label: 'Money' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private apiService: SatisticalService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      type: new FormControl(1),
    });
    this.search();
  }

  search() {
    // if (this.searchForm.value.type === 1) {
    //   this.apiService.satisticByGroup()
    //   .subscribe(rs => {
    //     setTimeout(() => {
    //       this.pieChartLabels = rs.map(item => item.name);
    //       this.pieChartData = rs.map(item => item.total);
    //       this.chart.chart.config.data.labels = this.pieChartLabels;
    //       this.chart.chart.update();
    //     }, 1000);
    //
    //   });
    // } else if (this.searchForm.value.type === 2) {
    //   this.apiService.satisticByBrand()
    //   .subscribe(rs => {
    //     this.pieChartType = 'bar';
    //     this.pieChartLabels = rs.map(item => item.name);
    //     const dataMoney: number[] = rs.map(item => item.totalMoney);
    //     const dataQuantity: number[] = rs.map(item => item.totalQuantity)
    //     this.pieChartData = [
    //       { data: dataMoney, label: 'Total money' },
    //       { data: dataQuantity, label: 'Total quantity' },
    //     ];
    //   });
    // } else if (this.searchForm.value.type === 3) {
    //   this.apiService.satisticByMonth()
    //   .subscribe(rs => this.lstUsers = rs);
    // }

  }

  ngAfterViewInit(): void {
    this.apiService.satisticByGroup()
    .subscribe(rs => {
        this.pieChartLabels = rs.map(item => item.name);
        this.pieChartData = rs.map(item => item.total);
        this.chart.chart.update();
    });
  }

}
