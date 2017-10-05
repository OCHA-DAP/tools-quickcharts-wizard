import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolsWizardComponent } from './tools-wizard/tools-wizard.component';
import { AppRoutingModule } from './app-routing.module';
import { ImportComponent } from './tools-wizard/import/import.component';
import { SelectComponent } from './tools-wizard/select/select.component';
import { ShareComponent } from './tools-wizard/share/share.component';
import { HttpService } from './shared/http.service';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';

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
    ImportComponent,
    SelectComponent,
    ShareComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule
  ],
  providers: [
    HTTP_SERVICE_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
