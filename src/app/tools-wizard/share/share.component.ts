import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { HttpService } from '../../shared/http.service';
import { environment } from '../../../environments/environment';
import { WizardConfigService } from './../../wizard-config.service';
import { AnalyticsService } from './../../common/analytics.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less']
})
export class ShareComponent implements OnInit {

  readonly stepName = '3. Share dashboard';

  httpService: HttpService;
  embedUrl: string = null;
  iFrameUrl: SafeResourceUrl = null;
  dataSource: string = null;

  @ViewChild('embedCode')
  private embedCode;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, public location: Location, http: Http,
              private wizardConfigService: WizardConfigService, private analyticsService: AnalyticsService) {
    this.httpService = <HttpService> http;
  }

  iFrameLoaded() {
    if (this.iFrameUrl) {
      console.log('iFrame loaded!');
      this.getEmbedUrl();
      this.httpService.turnOffModal();
    }
  }

  @HostListener('window:message', ['$event'])
  onEmbedUrl($event) {
    const action = $event.data;

    const EMBED_URL = 'embedUrl:';
    if (action && action.startsWith && action.startsWith(EMBED_URL)) {
      if (window.parent) {
        const url: string = action.slice(EMBED_URL.length);
        // const parentOrigin = window.parent.location.href;
        console.log(`EMBED URL: ${url}`);
        this.embedUrl = url;
        this.embedCode.nativeElement.focus();
        this.embedCode.nativeElement.setSelectionRange(0, 0);
        setTimeout(() => {
          this.embedCode.nativeElement.setSelectionRange(0, this.embedCode.nativeElement.value.length);
        }, 2);
        return;
      }
    }
  }

  getEmbedUrl() {
    const origin = window.location.origin;
    const iFrame: HTMLIFrameElement = <HTMLIFrameElement> document.getElementById('quick-charts-iframe');
    let iFrameOrigin = environment.hxlPreview;
    if (!iFrameOrigin.startsWith('http')) {
      iFrameOrigin = origin + iFrameOrigin;
    }
    iFrame.contentWindow.window.postMessage(`getEmbedUrl: ${origin}`, iFrameOrigin);
  }

  prepareShare($event, scrollto = false) {
    const element = $event.target;
    this.embedUrl = '';
    // element.setSelectionRange(0, 0);
    // element.setSelectionRange(0, element.value.length);
    element.scrollIntoView();
    setTimeout(() => {
      this.getEmbedUrl();
    }, 2);

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.httpService.turnOnModal();
      const urlParam = params.get('url');
      const url = encodeURIComponent(urlParam);
      const recipeUrl = encodeURIComponent(params.get('recipeUrl'));
      this.dataSource = urlParam;

      const hxlPreviewUrl = environment.hxlPreview;
      const newUrl = `${hxlPreviewUrl}/show;url=${url};recipeUrl=${recipeUrl};toolsMode=true`;
      this.embedUrl = newUrl;
      this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
    });
    this.analyticsService.trackStepLoad(this.stepName, false, true, this.getWizardConfig().url, this.getWizardConfig().recipeUrl);
  }

  getWizardConfig() {
    return this.wizardConfigService.getWizardConfigData();
  }

}
