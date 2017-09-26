import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolsWizardComponent } from './tools-wizard/tools-wizard.component';
import { AppRoutingModule } from './app-routing.module';
import { ImportComponent } from './tools-wizard/import/import.component';
import { SelectComponent } from './tools-wizard/select/select.component';
import { ShareComponent } from './tools-wizard/share/share.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
