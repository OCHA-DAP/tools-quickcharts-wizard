import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less']
})
export class ImportComponent implements OnInit {

  dataSourceSample = true;

  constructor() { }

  ngOnInit() {
  }

  changeDatasource($event) {
    this.dataSourceSample = $event.target.value === 'sample';
  }

}
