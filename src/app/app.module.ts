import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';
import { HxlPreviewLibModule} from 'hxl-preview-ng-lib';
import { AppComponent } from './app.component';
import { ToolsWizardComponent } from './tools-wizard/tools-wizard.component';
import { AppRoutingModule } from './app-routing.module';
import { ImportComponent } from './tools-wizard/import/import.component';
import { HttpService } from './shared/http.service';
import { CommonModule } from './common/common.module';
import { WizardConfigService } from './wizard-config.service';
import { ModalModule } from 'ngx-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

export const HTTP_SERVICE_PROVIDERS: any = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpService,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    ToolsWizardComponent,
    ImportComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HxlPreviewLibModule
  ],
  providers: [
    HTTP_SERVICE_PROVIDERS,
    WizardConfigService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
