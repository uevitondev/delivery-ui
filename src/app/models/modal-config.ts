import { ComponentType } from '@angular/cdk/portal';

export interface ModalConfig {
  component: ComponentType<any>;
  inputs: { [key: string]: () => void };
  outputs: { [key: string]: () => void };
  hasBackDrop?: boolean;
}
