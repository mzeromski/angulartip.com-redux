import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NykModule} from './nyk/nyk.module';
import {OAuthService} from 'angular2-oauth2/oauth-service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        NykModule
    ],
    providers: [
        OAuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}