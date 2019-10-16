import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface LayoutState {
   showHeader: boolean;
   showSideNavIcon: boolean;
   showSideNav: boolean;
}

export function createInitialState(): LayoutState {
  return {
    showHeader: false,
    showSideNavIcon: false,
    showSideNav: false
  };
}

@StoreConfig({ name: 'layout' })
@Injectable({providedIn: 'root'})
export class LayoutStore extends Store<LayoutState> {
  constructor() {
    super(createInitialState());
  }
}
