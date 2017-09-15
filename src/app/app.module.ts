import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolsWizardComponent } from './tools-wizard/tools-wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolsWizardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
