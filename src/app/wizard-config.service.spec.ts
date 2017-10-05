import { TestBed, inject } from '@angular/core/testing';

import { WizardConfigService } from './wizard-config.service';

describe('WizardConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WizardConfigService]
    });
  });

  it('should be created', inject([WizardConfigService], (service: WizardConfigService) => {
    expect(service).toBeTruthy();
  }));
});
