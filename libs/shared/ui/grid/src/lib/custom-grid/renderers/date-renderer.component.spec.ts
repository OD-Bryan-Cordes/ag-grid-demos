import { DateRendererParams } from '../types/cell-params';

import { DateRendererComponent } from './date-renderer.component';

describe(DateRendererComponent.name, () => {
  let component: DateRendererComponent;

  beforeEach(() => {
    component = new DateRendererComponent();
  });

  it('should have a default format', () => {
    component.agInit({} as DateRendererParams);

    expect(component.format).toEqual('YYYY-MM-dd HH:mm aa');
  });

  it('should override format if provided', () => {
    component.agInit({ format: 'YYYY' } as DateRendererParams);

    expect(component.format).toEqual('YYYY');
  });

  it('should append Z to dateString if not included', () => {
    const dateString = new Date().toISOString().slice(0, -1);

    component.agInit({ value: dateString } as DateRendererParams);

    expect(component.dateString).toEqual(dateString + 'Z');
  });

  it('should have a refresh method that returns false', () => {
    expect(component.refresh()).toBeFalsy();
  });
});
