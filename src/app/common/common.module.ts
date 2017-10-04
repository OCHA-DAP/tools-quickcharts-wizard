import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { GooglepickerDirective } from './googlepicker.directive';
import { DropboxchooserDirective } from './dropboxchooser.directive';

@NgModule({
  imports: [
    NgCommonModule
  ],
  declarations: [GooglepickerDirective, DropboxchooserDirective],
  exports: [GooglepickerDirective, DropboxchooserDirective]
})
export class CommonModule { }
