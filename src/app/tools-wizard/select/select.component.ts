import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { CookBookService, Bite, KeyFigureBite, ChartBite, TimeseriesChartBite } from 'hdxtools-ng-lib';
import { WizardConfigService } from './../../wizard-config.service';
import { GooglepickerDirective } from './../../common/googlepicker.directive';
import { DropboxchooserDirective } from './../../common/dropboxchooser.directive';
import 'rxjs/Rx';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  selectedRecipeUrl = 'https://raw.githubusercontent.com/OCHA-DAP/hdx-hxl-preview/master/src/assets/bites.json';

  keyfigureBites: Bite[] = [];
  chartBites: Bite[] = [];
  timeseriesBites: Bite[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
      private cookBookService: CookBookService, private wizardConfigService: WizardConfigService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const url = params.get('url');
      this.fetchAvailableBites(url);
    });
  }

  private fetchAvailableBites(url: string) {
    this.resetData();
    if (url) {
      this.wizardConfigService.getWizardConfigData().url = url;
    }

    this.cookBookService.load(this.wizardConfigService.getWizardConfigData().url,
      this.selectedRecipeUrl).subscribe((bite: Bite) => {
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
  }

  private resetData() {
    this.keyfigureBites = [];
    this.chartBites = [];
    this.timeseriesBites = [];
  }

  totalBites(): number {
    return this.keyfigureBites.length + this.chartBites.length + this.timeseriesBites.length;
  }

  updateSelectedRecipeUrl(newUrl: string) {
    this.selectedRecipeUrl = newUrl;
    this.fetchAvailableBites(this.wizardConfigService.getWizardConfigData().url);
  }

  navigateToShare() {
    this.router.navigate(['/share', {
      'url': this.wizardConfigService.getWizardConfigData().url,
      'recipeUrl': this.selectedRecipeUrl
    }]);
  }

}
