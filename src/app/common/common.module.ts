import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { GooglepickerDirective } from './googlepicker.directive';

@NgModule({
  imports: [
    NgCommonModule
  ],
  declarations: [GooglepickerDirective],
  exports: [GooglepickerDirective]
})
export class CommonModule { }
