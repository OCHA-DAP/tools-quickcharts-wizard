import { WizardConfigData } from './../../types/wizard-config-data';
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

  keyfigureBites: Bite[] = [];
  chartBites: Bite[] = [];
  timeseriesBites: Bite[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
      private cookBookService: CookBookService, private wizardConfigService: WizardConfigService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const url = params.get('url');
      if (url) {
        this.wizardConfigService.getWizardConfigData().url = url;
      }
      const recipeUrl = params.get('recipeUrl');
      if (recipeUrl) {
        this.wizardConfigService.getWizardConfigData().recipeUrl = recipeUrl;
      }
      this.fetchAvailableBites();
    });
  }

  changeRecipe($event) {
    this.getWizardConfig().step2Sample = $event.target.value === 'sample';
    if (this.getWizardConfig().step2Sample) {
      this.updateSelectedRecipeUrl(new WizardConfigData().recipeUrl);
    }
  }
  recipeUrlChanged($event) {
    this.updateSelectedRecipeUrl($event.target.value);
  }

  fetchAvailableBites() {
    this.resetData();

    this.cookBookService.load(this.wizardConfigService.getWizardConfigData().url,
      this.getWizardConfig().recipeUrl).subscribe((bite: Bite) => {
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

  getWizardConfig() {
    return this.wizardConfigService.getWizardConfigData();
  }

  totalBites(): number {
    return this.keyfigureBites.length + this.chartBites.length + this.timeseriesBites.length;
  }

  updateSelectedRecipeUrl(newUrl: string, isSampleUrl?: boolean) {
    // console.log(`Updating url to ${newUrl} -- was ${this.getWizardConfig().recipeUrl}`);
    if (this.getWizardConfig().recipeUrl !== newUrl) {
      this.getWizardConfig().recipeUrl = newUrl;
      this.fetchAvailableBites();
    }
    if (!isSampleUrl) {
      this.getWizardConfig().step2Sample = false;
    }
  }

  navigateToShare() {
    this.router.navigate(['/share', {
      'url': this.getWizardConfig().url,
      'recipeUrl': this.getWizardConfig().recipeUrl
    }]);
  }

}
