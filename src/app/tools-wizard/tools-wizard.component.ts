import { Component, OnInit } from '@angular/core';
import { HxlproxyService } from 'hdxtools-ng-lib';
import { environment } from './../../environments/environment';
import { Http } from '@angular/http';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hdx-tools-wizard',
  templateUrl: './tools-wizard.component.html',
  styleUrls: ['./tools-wizard.component.less']
})
export class ToolsWizardComponent implements OnInit {
  loadingStatus = false;
  private httpService: HttpService;

  constructor(private hxlProxyService: HxlproxyService, http: Http) {
    this.httpService = <HttpService> http;
  }

  ngOnInit() {
    this.hxlProxyService.init({
      'hxlProxy': environment['hxlProxy'],
      'noCachedMetarows': true
    });

    this.httpService.loadingChange.distinctUntilChanged().debounce(val => Observable.timer(val ? 100 : 300)).subscribe((value) => {
      this.loadingStatus = value;
      console.log('SPINNER ACTIVE CHANGE;');
    });
  }

}
