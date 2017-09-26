import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hdx-tools-wizard',
  templateUrl: './tools-wizard.component.html',
  styleUrls: ['./tools-wizard.component.less']
})
export class ToolsWizardComponent implements OnInit {
  stepDone = false;

  test() {
    this.stepDone = !this.stepDone;
  }

  constructor() { }

  ngOnInit() {
  }

}
