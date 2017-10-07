import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as account from '../actions/account';
import * as token from '../actions/token';
import {AccountService} from '../../modules/account/account.service';


@Injectable()
export class AccountEffects {

    constructor(private actions$: Actions,
                private accountService: AccountService) {
    }

    @Effect()
    getAccountList$: Observable<Action> = this.actions$
        .ofType(account.ACCOUNT_GET_LIST)
        .map(toPayload)
        .switchMap(() => {
            return this.accountService.getList()
                .map(response => new account.SetAcountList(response))
                .catch(() => Observable.of(new account.SetAcountList(null)));
        });
    
    @Effect()
    setToken$: Observable<Action> = this.actions$
        .ofType(token.SET_TOKEN)
        .map(toPayload)
        .filter(payload => !!payload)
        .map(payload => new account.GetAcountList());


}
