import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';
import { SimpleModule} from 'hxl-preview-ng-lib';
import { AppComponent } from './app.component';
import { ToolsWizardComponent } from './tools-wizard/tools-wizard.component';
import { AppRoutingModule } from './app-routing.module';
import { ImportComponent } from './tools-wizard/import/import.component';
import { HttpService } from './shared/http.service';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { CommonModule } from './common/common.module';
import { WizardConfigService } from './wizard-config.service';
import { ModalModule } from 'ngx-bootstrap';

export const HTTP_SERVICE_PROVIDERS: any = {
  provide: Http,
  useFactory: httpFactory,
  deps: [XHRBackend, RequestOptions]
};

export function httpFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options);
}

@NgModule({
  declarations: [
    AppComponent,
    ToolsWizardComponent,
    ImportComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    SimpleModule
  ],
  providers: [
    HTTP_SERVICE_PROVIDERS,
    WizardConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
