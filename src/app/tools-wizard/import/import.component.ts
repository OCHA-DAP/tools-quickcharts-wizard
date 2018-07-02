import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GooglepickerDirective } from './../../common/googlepicker.directive';
import { DropboxchooserDirective } from './../../common/dropboxchooser.directive';
import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener, ElementRef, TemplateRef } from '@angular/core';
import { WizardConfigService } from './../../wizard-config.service';
import { AnalyticsService } from './../../common/analytics.service';
import { HttpService } from '../../shared/http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less']
})
export class ImportComponent implements OnInit {

  readonly stepName = 'Import Data';

  _selectedUrl = '';
  sampleData = [
    {
      'id': 'f97cfa16-7b3e-4ef0-a65e-f05cabe5f9c8',
      'name': 'Yemen - Requirements and Funding Data',
      'description': 'FTS publishes data on humanitarian funding flows as reported by donors and recipient organizations. It presents all humanitarian funding to a country and funding that is specifically reported or that can be specifically mapped against funding requirements stated in humanitarian response plans.',
      'url': 'https://data.humdata.org/dataset/d3657fc6-8cf9-45a0-94e0-306ed741ae4a/resource/f97cfa16-7b3e-4ef0-a65e-f05cabe5f9c8/download/fts_requirements_funding_cluster_yem.csv',
      'org': 'OCHA FTS',
    },
    {
      'id': '2b5fc0ce-9416-447d-a2d3-9c3b5c6a90d3',
      'name': 'Nigeria Baseline Assessment Data',
      'description': 'Data set has IDPs, Households, geographic locations and reasons of displacement etc. In response to the need for accurate information on internally displaced persons (IDPs) in Nigeria, the International Organization for Migration (IOM) began implementing the Displacement Tracking Matrix (DTM) project in July 2014.',
      'url': 'https://data.humdata.org/dataset/4adf7874-ae01-46fd-a442-5fc6b3c9dff1/resource/2b5fc0ce-9416-447d-a2d3-9c3b5c6a90d3/download/dtm-nigeria-baseline-assessment-round-22.xlsx',
      'org': 'International Organization for Migration',
    },
    {
      'id': 'b8f708da-e596-456c-b550-f88959970d21',
      'name': 'Mali Who does What Where',
      'description': 'The Who does What Where (3W) is a core humanitarian coordination dataset. It is critical to know where humanitarian organizations are working, what they are doing and their capability in order to identify gaps, avoid duplication of efforts, and plan for future humanitarian response (if needed).',
      'url': 'https://data.humdata.org/dataset/d7ab89e4-bcb2-4127-be3c-5e8cf804ffd3/resource/b8f708da-e596-456c-b550-f88959970d21/download/mali_3wop_decembre-2017.xls',
      'org': 'OCHA Mali',
    },
    {
      'id': 'a125ca78-880b-4bcf-b368-70670f8ff49d',
      'name': 'UNHCR\'s populations of concern originating from Syria',
      'description': 'Data about UNHCR\'s populations of concern originating from Syria. ',
      'url': 'http://proxy.hxlstandard.org/data.csv?url=http%3A//popstats.unhcr.org/en/persons_of_concern.hxl&filter01=select&select-query01-01=%23country%2Borigin=Syrian%20Arab%20Rep.',
      'org': 'UNHCR - The UN Refugee Agency',
    },
    {
      'id': '5f837607-d988-411c-af9a-0a8325a8f7b8',
      'name': 'UNHCR\'s populations of concern residing in Syria',
      'description': 'Data about UNHCR\'s populations of concern residing in Syria.',
      'url': 'http://proxy.hxlstandard.org/data.csv?url=http%3A//popstats.unhcr.org/en/persons_of_concern.hxl&filter01=select&select-query01-01=%23country%2Bresidence=Syrian%20Arab%20Rep.',
      'org': 'UNHCR - The UN Refugee Agency',
    },
    {
      'id': '323e0b56-f2f7-4f93-b6de-af1a2e27c2c6',
      'name': 'List of airports in Somalia',
      'description': 'List of airports in Somalia, with latitude and longitude. Unverified community data from http://ourairports.com/countries/SO/',
      'url': 'http://ourairports.com/countries/SO/airports.hxl',
      'org': 'OurAirports',
    },

    // {
    //   'id': 'c7fb99a5-43ec-4b3f-b8db-935640c75aeb',
    //   'name': 'Madagascar - Cyclone Enawo Needs Assessment Data',
    //   'description': 'Madagascar, Cyclone Enawo Final Needs Assessment data with disaggregated data related to key ' +
    //                  'vulnerable populations and SADD available. Data collected and put together by the Malagasy Red ' +
    //                  'Cross Society (MRCS)',
    //   'url': 'https://data.humdata.org/dataset/94b6d7f8-9b6d-4bca-81d7-6abb83edae16/resource/c7fb99a5-43ec-4b3f-b8db-' +
    //          '935640c75aeb/download/assesment_data_crm_05april2017.xlsx',
    //   'org': 'IFRC',
    // },
    // {
    //   'id': '152cf5c1-c61c-4f61-9768-68ab7ca852a7',
    //   'name': 'Zika Cases per Country in South and Central America',
    //   'description': 'Zika Cases Tracker per Country in South and Central America',
    //   'url': 'https://data.humdata.org/dataset/zika-cases-per-country-in-south-and-central-america/resource/322af5fe-' +
    //          '8860-4c09-81c7-78510da9a4b0/download/data.csv',
    //   'org': 'BRC Maps Team',
    // },
    // {
    //   'id': '283503e7-13de-4528-9e57-a804196eb57a',
    //   'name': 'Afghan Voluntary Repatriation 2017',
    //   'description': '',
    //   'url': 'https://data.humdata.org/dataset/283503e7-13de-4528-9e57-a804196eb57a/resource/9fa44427-' +
    //   'b9f5-4d62-9b91-464750c17cbd/download/afghan-voluntary-repatriation-2017.xlsx',
    //   'org': 'UNHCR Afghanistan ',
    // },
    // {
    //   'id': '92128af6-6a4d-447c-bb9f-fa67fb0e17bb',
    //   'name': 'Ebola - West Africa - Ebola Treatment Centres, Isolation Wards Hospitals and Transit Centres',
    //   'description': '',
    //   'url': 'https://data.humdata.org/dataset/ebola-west-africa-ebola-treatment-centres-isolation-wards-hospitals-and-' +
    //   'transit-centres/resource/92128af6-6a4d-447c-bb9f-fa67fb0e17bb/download/data.csv',
    //   'org': 'BRC Maps Team',
    // },
    // {
    //   'id': '8d8dc190-142f-4b84-a526-db960f15ea8b',
    //   'name': 'Afghanistan - Natural disaster incidents in 2017',
    //   'description': 'Natural disaster events include avalanches, earthquakes, flooding, heavy rainfall & snowfall, ' +
    //   'and landslides & mudflows as recorded by OCHA field offices based on assessments in the field.',
    //   'url': 'http://data.humdata.org/dataset/78ab5218-ba2c-43c8-b086-1750d8d3c7f0/resource/8d8dc190-142f-4b84-a526-' +
    //   'db960f15ea8b/download/afghanistan-natural-disaster-incidents-from-1-january-to-11-aug-2017.xlsx',
    //   'org': 'OCHA Afghanistan',
    // },
    // {
    //   'id': '1f9bee15-3e3c-40fd-b205-935848d49f05',
    //   'name': 'INSO Key Data Dashboard, Jan 2016 to August 2017',
    //   'description': 'This dashboard provides aggregated global data on the safety & security incidents affecting NGOs ' +
    //                  'in those countries covered by INSO*. It is intended to improve the visibility of macro-trends in ' +
    //                  'humanitarian safety in order to raise awareness, inform research and strengthen operational ' +
    //                  'practise. All data is sourced from INSO and assumed correct at the time of publishing. Please ' +
    //                  'read below for advanced definitions & meanings. The information contained in this dashboard may ' +
    //                  'be cited or reproduced only with credit to INSO.',
    //   'url': 'https://data.humdata.org/dataset/019d1d0b-dc2f-4fa8-9355-fdc25da0ff4c/resource/1f9bee15-3e3c-40fd-b205-' +
    //          '935848d49f05/download/inso-ngo-safety-and-security-incidents-jan-2016-to-aug-2017.xlsx',
    //   'org': 'International NGO Safety Organisation (INSO)',
    // },
    // {
    //   'id': '8a595340-6ba7-461a-a6ed-be99c160fe43',
    //   'name': 'Population data by admin0, admin1 and admin2 (country, regions and departments).',
    //   'description': 'This data enumerates the population of Chad.',
    //   'url': 'http://data.humdata.org/dataset/5e60290d-0a82-48e2-9454-812b01c7d9d4/resource/8a595340-6ba7-461a-a6ed-' +
    //          'be99c160fe43/download/tcd_data_cod_ps_20170615.xlsx',
    //   'org': 'OCHA Chad',
    // },
    // {
    //   'id': 'f48c2fd7-9f36-47eb-9db9-ce6a8c04b30a',
    //   'name': 'Afghanistan - Natural disaster incidents in 2016',
    //   'description': 'Natural disaster events include avalanches, earthquakes, flooding, heavy rainfall & snowfall, ' +
    //   'and landslides & mudflows as recorded by OCHA field offices and IOM Afghanistan Humanitarian ' +
    //   'Assistance Database (HADB).',
    //   'url': 'http://data.humdata.org/dataset/dd05bb07-576a-40fe-a673-b3efeea78652/resource/f48c2fd7-9f36-47eb-9db9-' +
    //   'ce6a8c04b30a/download/afghanistan-natural-disaster-incidents-from-1-january-to-31-dec-2016.csv',
    //   'org': 'OCHA Afghanistan',
    // }
  ];

  httpService: HttpService;
  shareUrl: string = null;
  embedUrl: string = null;
  iFrameUrl: SafeResourceUrl = null;
  pngDownloadFlag: Boolean = false;
  pngDownloadUrl: SafeResourceUrl = null;
  menuEmbed = true;

  @ViewChild('quickChartsIFrame')
  private quickChartsIFrame: ElementRef;

  @ViewChild('embedCode')
  private embedCode: ElementRef;
  modalRef: BsModalRef;
  dataCheckIframeUrl: SafeResourceUrl = null;

  constructor(private router: Router, private route: ActivatedRoute,
                private wizardConfigService: WizardConfigService, private analyticsService: AnalyticsService,
                http: Http, private sanitizer: DomSanitizer, private modalService: BsModalService) {
    this.httpService = <HttpService> http;
  }

  get selectedUrl() {
    return this._selectedUrl;
  }

  set selectedUrl(selectedUrl: string) {
    this.getWizardConfig().hxlCheckError = null;
    this._selectedUrl = selectedUrl;
    const sivOpt: ScrollIntoViewOptions = {
      behavior: 'smooth'
    };
    this.quickChartsIFrame.nativeElement.scrollIntoView(sivOpt);
    this.embedUrl = null;
    this.updateIframeUrl();

    this.trackStepLoad();
  }



  ngOnInit() {
    this._selectedUrl = this.getWizardConfig().url ? this.getWizardConfig().url : this.sampleData[0].url;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.httpService.turnOnModal();
      const urlParam = params.get('url');
      if (urlParam) {
        this.wizardConfigService.getWizardConfigData().url = urlParam;
        this._selectedUrl = urlParam;
        this.getWizardConfig().step1Sample = false;
      }
      const recipeUrlParam = params.get('recipeUrl');
      if (recipeUrlParam) {
        this.wizardConfigService.getWizardConfigData().recipeUrl = recipeUrlParam;
      }

      this.updateIframeUrl();
      this.trackStepLoad();
    });

  }

  private trackStepLoad() {
    this.analyticsService.trackStepLoad(this.stepName, true, true, this.getWizardConfig().step1Sample,
                      this.getWizardConfig().url, this.getWizardConfig().recipeUrl,
                      this.getWizardConfig().hxlCheckError ? this.getWizardConfig().hxlCheckError.errorSummary : null);
  }

  private updateIframeUrl() {
    const url = encodeURIComponent(this._selectedUrl);
    const hxlPreviewUrl = environment.hxlPreview;
    let newUrl = `${hxlPreviewUrl}/show;url=${url};toolsMode=true`;
    if (this.wizardConfigService.getWizardConfigData().recipeUrl) {
      const recipeUrl = encodeURIComponent(this.wizardConfigService.getWizardConfigData().recipeUrl);
      newUrl += `;recipeUrl=${recipeUrl}`;
    }
    newUrl += `;sample=${this.getWizardConfig().step1Sample}`;
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
  }

  getWizardConfig() {
    return this.wizardConfigService.getWizardConfigData();
  }

  updateSelectedUrl(newUrl: string) {
    console.log('Updating with ' + newUrl);
    this.selectedUrl = newUrl;
    this.getWizardConfig().step1Sample = false;
  }
  changeDatasource($event) {
    this.getWizardConfig().step1Sample = $event.target.value === 'sample';
  }

  changeSampleUrl(url) {
    this.selectedUrl = url;
  }

  iFrameLoaded() {
    if (this.iFrameUrl) {
      console.log('iFrame loaded!');
      this.getEmbedUrl(false);
      this.httpService.turnOffModal();
    }
  }

  @HostListener('window:message', ['$event'])
  onEmbedUrl($event) {
    const action = $event.data;

    const EMBED_URL = 'embedUrl:';
    const IFRAME_HEIGHT_UPDATE = 'iframeHeightUpdate:';
    if (action && action.startsWith && action.startsWith(EMBED_URL)) {
      if (window.parent) {
        const url: string = action.slice(EMBED_URL.length);
        // const parentOrigin = window.parent.location.href;
        console.log(`EMBED URL: ${url}`);
        const initMode = this.embedUrl == null;
        this.shareUrl = url;
        this.embedUrl = `<iframe src="${url}" style="border:none; width:100%; min-height:500px">`;

        const snapService = environment.snapService;
        const urlEncoded = encodeURIComponent(url);
        const pngDownloadUrl = `${snapService}/png?viewport={"width": 1280, "height": 1}&url=${urlEncoded}`;
        this.pngDownloadUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pngDownloadUrl);
        if (this.pngDownloadFlag) {
          this.pngDownloadFlag = false;
          setTimeout(() => {
            window.open(pngDownloadUrl, '_blank');
          }, 2);
        }

        if (!initMode) {
          this.embedCode.nativeElement.focus();
          this.embedCode.nativeElement.setSelectionRange(0, 0);
          setTimeout(() => {
            this.embedCode.nativeElement.setSelectionRange(0, this.embedCode.nativeElement.value.length);
          }, 2);
        }
        return;
      }
    }
    if (action && action.startsWith && action.startsWith(IFRAME_HEIGHT_UPDATE)) {
      const height: string = action.slice(IFRAME_HEIGHT_UPDATE.length);
      this.quickChartsIFrame.nativeElement.style.minHeight = height + 'px';
    }
  }

  /**
   *
   * @param forShare is the link requested by the user for sharing purposes
   * @param forImage is the link needed for sharing as an image
   */
  getEmbedUrl(forShare: boolean, forImage?: boolean) {
    const origin = window.location.origin;
    const iFrame: HTMLIFrameElement = <HTMLIFrameElement> document.getElementById('quick-charts-iframe');
    let iFrameOrigin = environment.hxlPreview;
    if (!iFrameOrigin.startsWith('http')) {
      iFrameOrigin = origin + iFrameOrigin;
    }
    iFrame.contentWindow.window.postMessage({
      getEmbedUrl: origin,
      forShare: forShare,
      forImage: forImage
    }, iFrameOrigin);
  }

  prepareSnapshot($event) {
    this.pngDownloadFlag = true;
    this.getEmbedUrl(true, true);
  }

  prepareShare($event, scrollto = false) {
    const element = $event.target;
    this.shareUrl = '';
    this.embedUrl = '';
    // element.setSelectionRange(0, 0);
    // element.setSelectionRange(0, element.value.length);
    element.scrollIntoView({behavior: 'smooth', block: 'end'});
    setTimeout(() => {
      this.getEmbedUrl(true, false);
    }, 2);

  }

  changeMenuEmbed() {
    this.menuEmbed = !this.menuEmbed;
  }

  openModal(template: TemplateRef<any>) {
    const config = {
      animated: false
    };

    this.dataCheckIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://docs.google.com/presentation/d/e/2PACX-1vR-gSY38muZE9SA27NjAcueKoobhKi_Dc3jN4BIDPTp7FJjOCiWIkhPU4Z' +
      'kPyHvfR0pBdNpfswmKZ4p/embed?start=false&loop=false&delayms=3000');
    this.modalRef = this.modalService.show(template, config);
  }
}
