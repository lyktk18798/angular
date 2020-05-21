import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {lstSatisticType} from '../../constants/Constants';
import {ChartType, ChartOptions} from 'chart.js';
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, BaseChartDirective} from 'ng2-charts';
import {SatisticalService} from '../../service/satistical.service';

@Component({
  selector: 'app-satistic',
  templateUrl: './satistic.component.html',
  styleUrls: ['./satistic.component.scss']
})
export class SatisticComponent implements OnInit {
  searchForm: FormGroup;
  lstSatisticType = lstSatisticType;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['MAN', 'WOMAN', 'KID'];
  public pieChartData: SingleDataSet = [99333, 5555, 400];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private apiService: SatisticalService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      type: new FormControl(1),
    });
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.search();
  }
  search() {
    if (this.searchForm.value.type === 1) {
      this.apiService.satisticByGroup()
      .subscribe(rs => {
        setTimeout(() => {
          this.pieChartLabels = rs.map(item => item.name);
          this.pieChartData = rs.map(item => item.total);
          this.chart.chart.config.data.labels = this.pieChartLabels;
          this.chart.chart.update();
        }, 1000);

      });
    } else if (this.searchForm.value.type === 2) {
      this.apiService.satisticByBrand()
      .subscribe(rs => {
        this.pieChartType = 'bar';
        this.pieChartLabels = rs.map(item => item.name);
        const dataMoney: number[] = rs.map(item => item.totalMoney);
        const dataQuantity: number[] = rs.map(item => item.totalQuantity)
        this.pieChartData = [
          { data: dataMoney, label: 'Total money' },
          { data: dataQuantity, label: 'Total quantity' },
        ];
      });
    } else if (this.searchForm.value.type === 3) {
      this.apiService.satisticByMonth()
      .subscribe(rs => this.lstUsers = rs);
    }

  }

}
