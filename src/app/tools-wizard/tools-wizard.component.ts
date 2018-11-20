import { timer as observableTimer } from 'rxjs';

import { debounce, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HxlproxyService } from 'hxl-preview-ng-lib';
import { environment } from './../../environments/environment';
import { HttpService } from '../shared/http.service';
import { HxlCheckService } from './../common/hxl-check.service';
import { AnalyticsService } from './../common/analytics.service';

@Component({
  selector: 'hdx-tools-wizard',
  templateUrl: './tools-wizard.component.html',
  styleUrls: ['./tools-wizard.component.less']
})
export class ToolsWizardComponent implements OnInit {
  loadingStatus = false;

  constructor(private hxlProxyService: HxlproxyService, private httpService: HttpService, private hxlCheckService: HxlCheckService,
              private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.hxlProxyService.init({
      'hxlProxy': environment['hxlProxy'],
      'noCachedMetarows': true
    });

    this.hxlCheckService.init(environment['hxlCheck']);
    this.analyticsService.init();

    this.httpService.loadingChange
      .pipe(
        distinctUntilChanged(),
        debounce(val => observableTimer(val ? 100 : 300))
      ).subscribe((value) => {
        this.loadingStatus = value;
        console.log('SPINNER ACTIVE CHANGE;');
      });
  }

}
