import { Query } from '@datorama/akita';
import { LayoutState, LayoutStore } from './layout.store';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LayoutQuery extends Query<LayoutState> {

    constructor(protected store: LayoutStore) {
        super(store);
    }

    get layoutState() {
        return this.getValue();
    }

    get showHeader$() {
        return this.select(state => state.showHeader);
    }

    get showSideNav$() {
        return this.select(state => state.showSideNav);
    }

    get showSideNavIcon$() {
        return this.select(state => state.showSideNavIcon);
    }
}
