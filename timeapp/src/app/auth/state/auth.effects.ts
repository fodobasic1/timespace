import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { AuthService } from "src/app/core/services/auth.service";
import { autoLogin, autoLoginFailed, loginStart, loginSuccess, logout } from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            mergeMap((action) => {

                const user = new User(
                    action.username,
                    action.password,
                    action.apiguid
                );
                this.authService.storeUserInLocalStorage(user);
                return of(loginSuccess({ user: user, redirect: true }));
            })
        )
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            tap((action) => {
                if(action.redirect) {
                    this.router.navigate(['/employees'])
                }
            })
        )
    }, { dispatch: false });

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.fethcUserFromLocalStorage();
                if(user) {
                    return of(loginSuccess({ user, redirect: true}));
                }
                
                this.router.navigate(['/settings']);
                return of(autoLoginFailed());
            })
        )
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logout),
            map((action) => {
                this.authService.logout();
                this.router.navigate(['/']);
            })
        )
    }, { dispatch: false });
}