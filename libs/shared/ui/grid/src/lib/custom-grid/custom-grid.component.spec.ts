import { CellClassParams } from '@ag-grid-community/core';
import { TestBed } from '@angular/core/testing';
import { FormArrayName, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CustomGridComponent } from './custom-grid.component';

describe(CustomGridComponent.name, () => {
  const fb = new FormBuilder();
  let component: CustomGridComponent;

  const mockFormArray = () => ({
    control: fb.array([
      fb.group({ letter: 'A' }),
      fb.group({ letter: 'B' }),
      fb.group({ letter: 'C' }),
    ]),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        CustomGridComponent,
        {
          provide: FormArrayName,
          useFactory: mockFormArray,
        },
      ],
    });
  });

  describe('with default settings', () => {
    beforeEach(() => {
      component = TestBed.inject(CustomGridComponent);
      component.gridOptions = {
        rowData: [
          { make: 'Toyota', model: 'Celica', price: 35000 },
          { make: 'Ford', model: 'Mondeo', price: 32000 },
          { make: 'Porsche', model: 'Boxter', price: 72000 },
        ],
        columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
        defaultColDef: { editable: false },
        serverSideDatasource: { getRows: jest.fn() },
      };
    });

    it('should return ag-invalid-row-cell callback result based on form state in grid context', () => {
      const formArray = fb.array([fb.group({ name: [null, Validators.required] })]);
      const targetFn = component.gridOptions.defaultColDef?.cellClassRules?.[
        'ag-invalid-row-cell'
      ] as (params: CellClassParams) => boolean;
      const params = {
        rowIndex: 0,
        colDef: { field: 'name' },
        context: { formArray },
      } as unknown as CellClassParams;

      const result = targetFn(params);

      expect(result).toBe(true);
    });

    it('should handle cell class with missing or invalid fields', () => {
      const targetFn = component.gridOptions.defaultColDef?.cellClassRules?.[
        'ag-invalid-row-cell'
      ] as (params: CellClassParams) => boolean;

      const result = targetFn({ context: {} } as CellClassParams);

      expect(result).toBe(false);
    });

    it('should listen to formArray valueChanges when FormArrayName is provided', () => {
      component.ngOnInit();
      expect(component.formValue).toBeTruthy();
    });
    
    it('should not set server-side options if serverSideDatasource property is unset', () => {
      component.gridOptions = {
        rowData: [
          { make: 'Toyota', model: 'Celica', price: 35000 },
          { make: 'Ford', model: 'Mondeo', price: 32000 },
          { make: 'Porsche', model: 'Boxter', price: 72000 },
        ],
        columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
      };

      expect(component.gridOptions.serverSideDatasource).toBeUndefined();
    });
  });

  describe('with overridden provider', () => {
    beforeEach(() => {
      TestBed.overrideProvider(FormArrayName, { useValue: null });
      component = TestBed.inject(CustomGridComponent);
    });

    it('should not break if FormArrayName is not provided', () => {
      component.ngOnInit();
      expect(component.formArray).toBeNull();
      expect(component.formValue).toBeUndefined();
    });
  });
});
