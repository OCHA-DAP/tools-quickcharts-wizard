import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { GooglepickerDirective } from './googlepicker.directive';
import { DropboxchooserDirective } from './dropboxchooser.directive';
import { HxlCheckService } from './hxl-check.service';

@NgModule({
  imports: [
    NgCommonModule
  ],
  declarations: [GooglepickerDirective, DropboxchooserDirective],
  exports: [GooglepickerDirective, DropboxchooserDirective],
  providers: [HxlCheckService]
})
export class CommonModule { }
