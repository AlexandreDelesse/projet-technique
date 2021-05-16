import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsSettingComponent } from './emails-setting.component';

describe('EmailsSettingComponent', () => {
  let component: EmailsSettingComponent;
  let fixture: ComponentFixture<EmailsSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
