import { fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { firstValueFrom, of } from 'rxjs';

import { FormControlSelectEditorParams } from '../types/cell-params';

import {
  FormControlSelectEditorComponent,
  mapToChoices,
} from './form-control-select-editor.component';

describe('FormControlSelectEditorComponent', () => {
  const fb = new FormBuilder();
  let component: FormControlSelectEditorComponent;

  beforeEach(() => {
    component = new FormControlSelectEditorComponent();
  });

  it('should run init logic', () => {
    const params = {
      context: {
        formArray: fb.array([
          fb.group({
            message: ['Hello'],
          }),
        ]),
      },
      node: { rowIndex: 0 },
      colDef: { field: 'message' },
      choices: ['A', 'B', 'C'],
      multiple: true,
    } as unknown as FormControlSelectEditorParams;

    component.agInit(params);

    expect(component['rowIndex']).toEqual(params.node.rowIndex);
  });

  it('should throw if no FormArray is passed through params.context', () => {
    expect(() =>
      component.agInit({
        context: {},
      } as FormControlSelectEditorParams),
    ).toThrow();
  });

  it('should handle Observable and pre-formatted Choice', () => {
    const params = {
      context: {
        formArray: fb.array([
          fb.group({
            message: ['Hello'],
          }),
        ]),
      },
      node: { rowIndex: 0 },
      colDef: { field: 'message' },
      choices: of([
        { display: 'A', value: 'A' },
        { display: 'B', value: 'B' },
      ]),
    } as FormControlSelectEditorParams;

    component.agInit(params);

    expect(component.getValue()).toEqual(component.control.value);
  });

  it('should set default values', () => {
    const params = {
      context: {
        formArray: fb.array([]),
      },
      node: {},
      colDef: {},
      choices: [1, 2, 3],
    };

    component.agInit(params as unknown as FormControlSelectEditorParams);

    expect(component['rowIndex']).toEqual(-1);
    expect(component['controlName']).toEqual('');
  });

  it('should handle choice factory from sibling field', async () => {
    const params = {
      context: {
        formArray: fb.array([]),
      },
      node: {},
      colDef: {},
      choices: (multiplier: number) => of([multiplier, multiplier * 2]),
      withField: 'someField',
      data: {
        someField: 3,
      },
    };

    component.agInit(params as unknown as FormControlSelectEditorParams);

    const result = await firstValueFrom(component.choices$);
    const expected = [
      { display: 3, value: 3 },
      { display: 6, value: 6 },
    ];
    expect(result).toEqual(expected);
  });

  it('should handle choice factory with no parameters', async () => {
    const params = {
      context: {
        formArray: fb.array([]),
      },
      node: {},
      colDef: {},
      choices: () => of([1, 2]),
    };

    component.agInit(params as unknown as FormControlSelectEditorParams);

    const result = await firstValueFrom(component.choices$);
    const expected = [
      { display: 1, value: 1 },
      { display: 2, value: 2 },
    ];
    expect(result).toEqual(expected);
  });

  it('should throw if no choices are provided', () => {
    const params = {
      context: {
        formArray: fb.array([]),
      },
      node: {},
      colDef: {},
    } as FormControlSelectEditorParams;

    expect(() => component.agInit(params)).toThrow();
  });

  it('should throw if no viable combination is provided', () => {
    const params = {
      context: {
        formArray: fb.array([]),
      },
      choices: (_arg: unknown) => [],
      node: {},
      colDef: {},
    } as unknown as FormControlSelectEditorParams;

    expect(() => component.agInit(params)).toThrow();
  });

  it('should stop editing on selection change', () => {
    const params = {
      context: {
        formArray: fb.array([]),
      },
      node: {},
      colDef: {},
      choices: [1, 2, 3],
      api: {
        stopEditing: jest.fn(),
      },
    } as unknown as FormControlSelectEditorParams;

    component.agInit(params);
    component.onStopEditing();

    expect(params.api?.stopEditing).toHaveBeenCalled();
  });

  it('should call select.open after choices emits', fakeAsync(() => {
    component.select = { open: jest.fn() } as unknown as MatSelect;
    component.choices = [];
    component.choices$.subscribe();
    tick();

    expect(component.select.open).toHaveBeenCalled();
  }));

  it('should fail silently if uninitialized references are accessed', fakeAsync(() => {
    component.choices = [];
    component.choices$.subscribe();
    tick();

    expect(() => component.onStopEditing()).not.toThrow();
  }));

  describe('mapToChoices', () => {
    it('should handle nullish values for backend issues', async () => {
      const source = of(null as unknown as []);
      const result = await firstValueFrom(source.pipe(mapToChoices()));

      expect(result).toEqual([]);
    });

    it('should handle pre-formatted choices', async () => {
      const choices = [{ display: 'Hi', value: 1 }];
      const source = of(choices);
      const result = await firstValueFrom(source.pipe(mapToChoices()));

      expect(result).toEqual(choices);
    });
  });
});
