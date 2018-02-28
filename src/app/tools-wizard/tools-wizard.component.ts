import { Component, OnInit } from '@angular/core';
import { HxlproxyService } from 'hxl-preview-ng-lib';
import { environment } from './../../environments/environment';
import { Http } from '@angular/http';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs/Observable';
import { HxlCheckService } from './../common/hxl-check.service';
import { AnalyticsService } from './../common/analytics.service';

@Component({
  selector: 'hdx-tools-wizard',
  templateUrl: './tools-wizard.component.html',
  styleUrls: ['./tools-wizard.component.less']
})
export class ToolsWizardComponent implements OnInit {
  loadingStatus = false;
  private httpService: HttpService;

  constructor(private hxlProxyService: HxlproxyService, http: Http, private hxlCheckService: HxlCheckService,
              private analyticsService: AnalyticsService) {
    this.httpService = <HttpService> http;
  }

  ngOnInit() {
    this.hxlProxyService.init({
      'hxlProxy': environment['hxlProxy'],
      'noCachedMetarows': true
    });

    this.hxlCheckService.init(environment['hxlCheck']);
    this.analyticsService.init();

    this.httpService.loadingChange.distinctUntilChanged().debounce(val => Observable.timer(val ? 100 : 300)).subscribe((value) => {
      this.loadingStatus = value;
      console.log('SPINNER ACTIVE CHANGE;');
    });
  }

}
