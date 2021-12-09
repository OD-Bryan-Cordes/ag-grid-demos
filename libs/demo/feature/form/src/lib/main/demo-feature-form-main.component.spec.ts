import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFeatureFormMainComponent } from './demo-feature-form-main.component';

describe('MainComponent', () => {
  let component: DemoFeatureFormMainComponent;
  let fixture: ComponentFixture<DemoFeatureFormMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoFeatureFormMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoFeatureFormMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
