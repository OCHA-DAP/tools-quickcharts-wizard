import { Injectable } from '@angular/core';
import { AnalyticsService as GenericAnalyticsService, GA_PAGEVIEW } from 'hdxtools-ng-lib';
import { environment } from './../../environments/environment';

declare const window: any;

@Injectable()
export class AnalyticsService {

  constructor(private genericAnalyticsService: GenericAnalyticsService) { }

  public init() {
    const hostname = window.location.hostname;

    const gaToken = environment['googleAnalyticsKey'];
    const mpToken = hostname === environment['prodHostname'] ?          // if is prod use prod key
        environment['prodMixpanelKey'] : environment['testMixpanelKey'];

    this.genericAnalyticsService.init(gaToken, mpToken);
  }

  public trackStepLoad(stepName: string, firstStep: boolean, lastStep: boolean,
            dataSourceUrl?: string, recipeUrl?: string) {

    const mpData = {
      'step name': stepName,
      'first step': firstStep,
      'last step': lastStep,
    };
    if (dataSourceUrl) {
      mpData['data source url'] = dataSourceUrl;
    }
    if (recipeUrl) {
      mpData['recipe url'] = recipeUrl;
    }

    this.genericAnalyticsService.trackEventCategory('load step', {action: stepName}, mpData);

  }

}
