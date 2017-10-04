import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { CookBookService, Bite, KeyFigureBite, ChartBite, TimeseriesChartBite } from 'hdxtools-ng-lib';
import { WizardConfigService } from './../../wizard-config.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  keyfigureBites: Bite[] = [];
  chartBites: Bite[] = [];
  timeseriesBites: Bite[] = [];

  constructor(private route: ActivatedRoute, private cookBookService: CookBookService, private wizardConfigService: WizardConfigService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.resetData();
      const url = params.get('url');
      if (url) {
        this.wizardConfigService.getWizardConfigData().url = url;
      }

      this.cookBookService.load(this.wizardConfigService.getWizardConfigData().url,
        'https://raw.githubusercontent.com/OCHA-DAP/hdx-hxl-preview/master/src/assets/bites.json').subscribe((bite: Bite) => {
          switch (bite.type) {
            case KeyFigureBite.type():
              this.timeseriesBites.push(bite);
              break;
            case ChartBite.type():
              this.chartBites.push(bite);
              break;
            case TimeseriesChartBite.type():
              this.keyfigureBites.push(bite);
              break;
          }
        });

      // this.totalNumOfBites = 2;
    });
  }

  private resetData() {
    this.keyfigureBites = [];
    this.chartBites = [];
    this.timeseriesBites = [];
  }

  totalBites(): number {
    return this.keyfigureBites.length + this.chartBites.length + this.timeseriesBites.length;
  }

}
