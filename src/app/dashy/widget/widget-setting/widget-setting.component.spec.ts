import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSettingComponent } from './widget-setting.component';

describe('WidgetSettingComponent', () => {
  let component: WidgetSettingComponent;
  let fixture: ComponentFixture<WidgetSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
