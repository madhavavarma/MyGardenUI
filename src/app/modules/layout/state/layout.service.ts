import { LayoutStore, LayoutState } from './layout.store';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LayoutService {
  constructor(private layoutStore: LayoutStore) {}

  updateLayout(layoutState: Partial<LayoutState>) {
    this.layoutStore.update(() => layoutState);
  }

  toggleSideNav() {
    this.layoutStore.update(state => ({ showSideNav: !state.showSideNav}) );
  }
}
