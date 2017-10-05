import {createSelector} from 'reselect';
import * as fromToken from './token';
import * as fromLayout from './layout';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../../../environments/environment';


export interface StateCollection {
    layout: fromLayout.State;
    token: fromToken.State;
}

const reducers = {
    layout: fromLayout.reducer,
    token: fromToken.reducer,
};
const developmentReducer: ActionReducer<StateCollection> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<StateCollection> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}

export const getTokenState = (state: StateCollection) => state.token;


export const TokenState = {
    showLoginForm: createSelector(getTokenState, fromToken.getShowLoginForm),
    getToken: createSelector(getTokenState, fromToken.getToken),
    getTokenExpire: createSelector(getTokenState, fromToken.getExpire),
    getTokenLoginProcess: createSelector(getTokenState, fromToken.getLoginProcess),
};

export const getLayoutState = (state: StateCollection) => state.layout;
export const getShowSidenav = createSelector(getLayoutState, fromLayout.getShowSidenav);
export const getShowSidenavExpire = createSelector(getLayoutState, fromLayout.getShowSidenavExpire);