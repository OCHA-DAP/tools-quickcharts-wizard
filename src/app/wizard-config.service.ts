import { Injectable } from '@angular/core';
import { WizardConfigData, QCConfigParams } from './types/wizard-config-data';
import { ParamMap } from '@angular/router';

@Injectable()
export class WizardConfigService {

  private data: WizardConfigData = new WizardConfigData();

  constructor() { }

  public initQuickchartsConfig(params: ParamMap): void {
    const allKeys = params.keys;
    for (const key of allKeys) {
      if (key.startsWith('QC_') && key.length > 3) {
        const newKey = key.substring(3);
        this.getQCConfig()[newKey] = params.get(key);
      }
    }

  }

  public computeQuickChartParams(): string {
    let result = '';
    const qcConfig = this.getQCConfig();
    for (const key in qcConfig) {
      if (qcConfig.hasOwnProperty(key)) {
        const value = encodeURIComponent(qcConfig[key]);
        result += `;${key}=${value}`;
      }
    }
    return result;
  }

  public getWizardConfigData(): WizardConfigData {
    return this.data;
  }

  public getQCConfig(): QCConfigParams {
    return this.data.qcConfig;
  }

}
