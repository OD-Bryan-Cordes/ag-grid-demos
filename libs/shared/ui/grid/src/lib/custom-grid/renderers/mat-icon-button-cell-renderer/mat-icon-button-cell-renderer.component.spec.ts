import { MatIconButtonCellRendererParams } from '../../types/cell-params';

import { MatIconButtonCellRendererComponent } from './mat-icon-button-cell-renderer.component';

describe(MatIconButtonCellRendererComponent.name, () => {
  let component: MatIconButtonCellRendererComponent;

  beforeEach(() => {
    component = new MatIconButtonCellRendererComponent();
  });

  it('should run init logic', () => {
    const params = {
      clicked: jest.fn(),
    } as unknown as MatIconButtonCellRendererParams;

    component.agInit(params as MatIconButtonCellRendererParams);
  });

  it('should have a refresh method that returns false', () => {
    expect(component.refresh()).toBeFalsy();
  });
});
