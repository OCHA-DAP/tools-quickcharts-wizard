import { Injectable } from '@angular/core';
import { WizardConfigData } from './types/wizard-config-data';

@Injectable()
export class WizardConfigService {

  private data: WizardConfigData = new WizardConfigData();

  constructor() { }

  public getWizardConfigData(): WizardConfigData {
    return this.data;
  }

}
