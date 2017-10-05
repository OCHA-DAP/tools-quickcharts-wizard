import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less']
})
export class ShareComponent implements OnInit {
  embedUrl: string = null;
  iFrameUrl: SafeResourceUrl = null;
  dataSource: string = null;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, public location: Location) {
  }

  iFrameLoaded() {
    if (this.iFrameUrl) {
      console.log('iFrame loaded!');
      this.getEmbedUrl();
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
        return;
      }
    }
  }

  getEmbedUrl() {
    const origin = window.location.origin;
    const iFrame: HTMLIFrameElement = <HTMLIFrameElement> document.getElementById('quick-charts-iframe');
    const iFrameOrigin = 'http://localhost:4201/';
    iFrame.contentWindow.window.postMessage(`getEmbedUrl: ${origin}`, iFrameOrigin);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const urlParam = params.get('url');
      const url = encodeURIComponent(urlParam);
      const recipeUrl = encodeURIComponent(params.get('recipeUrl'));
      this.dataSource = urlParam;

      const newUrl = `http://localhost:4201/show;url=${url};recipeUrl=${recipeUrl}`;
      this.embedUrl = newUrl;
      this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
    });
  }

}
