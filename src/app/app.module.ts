import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SimpleModule} from 'hdxtools-ng-lib';
import { AppComponent } from './app.component';
import { ToolsWizardComponent } from './tools-wizard/tools-wizard.component';
import { AppRoutingModule } from './app-routing.module';
import { ImportComponent } from './tools-wizard/import/import.component';
import { SelectComponent } from './tools-wizard/select/select.component';
import { ShareComponent } from './tools-wizard/share/share.component';
import { CommonModule } from './common/common.module';
import { WizardConfigService } from './wizard-config.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolsWizardComponent,
    ImportComponent,
    SelectComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    SimpleModule
  ],
  providers: [WizardConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
