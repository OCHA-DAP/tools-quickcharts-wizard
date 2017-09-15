import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsWizardComponent } from './tools-wizard.component';

describe('ToolsWizardComponent', () => {
  let component: ToolsWizardComponent;
  let fixture: ComponentFixture<ToolsWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
