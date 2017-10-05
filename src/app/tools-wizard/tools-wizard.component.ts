import { Component, OnInit } from '@angular/core';
import { HxlproxyService } from 'hdxtools-ng-lib';
import { environment } from './../../environments/environment';

@Component({
  selector: 'hdx-tools-wizard',
  templateUrl: './tools-wizard.component.html',
  styleUrls: ['./tools-wizard.component.less']
})
export class ToolsWizardComponent implements OnInit {
  loadingStatus = false;

  constructor(private hxlProxyService: HxlproxyService) { }

  ngOnInit() {
    this.hxlProxyService.init({
      'hxlProxy': environment['hxlProxy'],
      'noCachedMetarows': true
    });
  }

}
