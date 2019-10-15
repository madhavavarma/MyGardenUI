import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface LayoutState {
   showHeader: boolean;
   showSideNav: boolean;
}

export function createInitialState(): LayoutState {
  return {
    showHeader: true,
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
