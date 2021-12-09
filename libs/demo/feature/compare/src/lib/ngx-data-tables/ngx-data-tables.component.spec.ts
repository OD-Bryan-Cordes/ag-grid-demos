import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDataTablesComponent } from './ngx-data-tables.component';

describe('NgxDataTablesComponent', () => {
  let component: NgxDataTablesComponent;
  let fixture: ComponentFixture<NgxDataTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDataTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDataTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
