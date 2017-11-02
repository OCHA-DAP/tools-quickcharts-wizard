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
import { HttpService } from '../../shared/http.service';
import { Http } from '@angular/http';
import { HxlCheckService, HxlCheckResponse } from './../../common/hxl-check.service';
import { AnalyticsService } from './../../common/analytics.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  readonly stepName = '2. Select Recipe';

  keyfigureBites: Bite[] = [];
  chartBites: Bite[] = [];
  timeseriesBites: Bite[] = [];
  private httpService: HttpService;

  constructor(private router: Router, private route: ActivatedRoute,
      private cookBookService: CookBookService, private wizardConfigService: WizardConfigService, http: Http,
      private hxlCheckService: HxlCheckService, private analyticsService: AnalyticsService) {
    this.httpService = <HttpService> http;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.httpService.turnOnModal();
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

    this.analyticsService.trackStepLoad(this.stepName, false, false, this.getWizardConfig().url, this.getWizardConfig().recipeUrl);
  }

  changeRecipe($event) {
    this.getWizardConfig().step2Sample = $event.target.value === 'sample';
    if (this.getWizardConfig().step2Sample) {
      this.updateSelectedRecipeUrl(new WizardConfigData().recipeUrl, true);
    }
  }
  recipeUrlChanged($event) {
    this.updateSelectedRecipeUrl($event.target.value);
  }

  fetchAvailableBites() {
    this.resetData();
    const checkObs = this.hxlCheckService.check(this.getWizardConfig().url);
    const bitesObs = this.cookBookService.load(this.getWizardConfig().url,
      this.getWizardConfig().recipeUrl);

      checkObs.subscribe( (checkResult: HxlCheckResponse) => {
        if (!checkResult.status) {
          this.getWizardConfig().hxlCheckError = 'HXL tags were not detected on the selected resource. \
                        Choose another resource with hxl tags or learn how to add tags by seeing examples on \
                      <a target="_blank" href="http://tools.humdata.org/examples/hxl/"> http://tools.humdata.org/examples/hxl/ </a>';
          this.router.navigate(['/import']);
        }
      });

    bitesObs.subscribe( (bite: Bite) => {
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
